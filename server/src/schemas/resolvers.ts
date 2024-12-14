import User from '../models/User.js';
import Vehicle from '../models/Vehicle.js'
import Service from '../models/Service.js'
import { IService } from '../models/Service.js';
import { signToken, AuthenticationError } from '../services/auth.js';

interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    phonenumber:string;
    vehicles: Vehicle[];
}

interface Vehicle {
    vin: string;
    year: string;
    make: string;
    car_model: string;
    mileage: number;
    services: Service[];
}

interface AddVehicleArgs {
    input: {
        vin: string;
        year: string;
        make: string;
        car_model: string;
        mileage: number;
    }
}

interface Service {
    name: string;
    date_performed: string;
    mileage_performed: number;
    cost: number;
    description: string;
    is_overdue: boolean;
}

interface AddServiceArgs {
    input: {
        vin: string;
        // serviceType is an enum; its either 'SERVICE' or 'EXPENSE'
        serviceType: 'SERVICE' | 'EXPENSE';
        name: string;
        date_performed: string;
        mileage_performed: number;
        cost: number;
        description: string;
        is_overdue: boolean;
    }
}

interface AddUserArgs {
  input:{
    username: string;
    email: string;
    password: string;
    phonenumber:string;
    vehicles: []
  }
}

interface Context {
  user: User | null; // Authenticated user
  models: {
    User: typeof User;
    Vehicle: typeof Vehicle;
    Service: typeof Service;
  };
}

const resolvers = { 
    Query: {
        me: async (_parent: any, _args: any, context: Context): Promise<User | null> => {
            if (context.user) {
                return await User.findOne({_id:context.user._id});
            }
            throw AuthenticationError;
        },
        getUser: async (_parent: any, _args: any, { username }: { username: string}, context: Context): Promise<User | null> => {

            if (context.user) {
                return await User.findOne({username:username})
            }
            throw AuthenticationError;
        },
        getVehicles: async (_parent: any, _args: any, context: Context): Promise<Vehicle[] | null> => {

            if (context.user) {
                const current_user = await User.findOne({_id:context.user._id}).populate('vehicles');
                return current_user?.vehicles as unknown as Vehicle[] || null; // casts to unknown then Vehicle[] to agree on types, a bit sketchy
            }
            throw new AuthenticationError('You must be logged in to view this information.');
        },
        
        getServices: async (_parent: any, { vin }: { vin: string }, context: Context): Promise<IService[] | null> => {
            try {
                if (context.user) {
                    // Find the user and get the specific vehicle by its _id
                    const user = await User.findOne(
                        { _id: context.user._id, 'vehicles.vin': vin },
                        { 'vehicles.$': 1 } // Only include the matched vehicle
                    );

                    // Return the services array if the vehicle is found
                    const vehicle = user?.vehicles[0];
                    const services = vehicle?.services || [];

                    // Filter services based on serviceType 'SERVICE'
                    return services.filter(service => service.serviceType === 'SERVICE');
                }
                throw new Error("User not authenticated");
            } catch (err) {
                console.error("Error fetching services:", err);
                throw new Error("Could not retrieve services");
            }
        },

        getExpenses: async (_parent: any, { vin }: { vin: string }, context: Context): Promise<IService[] | null> => {
            try {
                if (context.user) {
                    // Find the user and get the specific vehicle by its _id
                    const user = await User.findOne(
                        { _id: context.user._id, 'vehicles.vin': vin },
                        { 'vehicles.$': 1 } // Only include the matched vehicle
                    );

                    // Return the services array if the vehicle is found
                    const vehicle = user?.vehicles[0];
                    const services = vehicle?.services || [];

                    // Filter services based on serviceType 'SERVICE'
                    return services.filter(service => service.serviceType === 'EXPENSE');
                }
                throw new Error("User not authenticated");
            } catch (err) {
                console.error("Error fetching services:", err);
                throw new Error("Could not retrieve services");
            }
        },
        // getVehicle: async (_parent: any, _args: any, context: Context): Promise<Vehicle | null> => {

        //     if (context.user) {
        //         const current_user = await User.findOne({_id:context.user._id}).populate('vehicles');
        //         const user_vehicles = current_user?.vehicles as unknown as Vehicle[] || null; // casts to unknown then Vehicle[] to agree on types, a bit sketchy
        //         return user_vehicles[0]; 
        //     }
        //     throw new AuthenticationError('You must be logged in to view this information.');
        // },
        // getExpenses: async (_parent: any, _args: any, { vehicle_id }: { vehicle_id: string}, context: Context): Promise<User | null> => {

        //     if (context.user) {
        //         return await User.findOne({_id: })
        //     }
        //     throw AuthenticationError;
        // },
    },
        // getVehicle: async (_parent: any, _args: any, context: Context): Promise<Vehicle | null> => {
        //     if (context.user) {
        //         return await Vehicle.findOne({_id:context.vehicle.vin})
        //     }
        //     // Vehicle not found error
        //     throw GraphQLError;
        // },
        // getServiceDetails: async (_parent: any, _args: any, context: Context): => {

        // }
    Mutation: {
        login: async (_parent: any, {username, password}: {username: string, password: string}) => {
            const user = await User.findOne({username});
            if (!user) {
                throw new AuthenticationError('Cound not authenticate user');
            }

            const correctPassword = await user.isCorrectPassword(password);
            if (!correctPassword) {
                throw new AuthenticationError('Cound not authenticate user');
                // removing this error for now because passwords aren't being hashed in seeds
            }

            const token = signToken(user.username, user.email, user._id);

            return {token, user};
        },

        // Added vehicle list to new user input

        addUser: async (_parent: any, {input}: AddUserArgs): Promise<{token: string; user: User}> => {
            try {
            const newUser = await User.create({...input});

            const token = signToken(newUser.username, newUser.email, newUser._id);
            const user: User = {
                _id: newUser._id as string,
                username: newUser.username,
                email: newUser.email,
                password: newUser.password,
                phonenumber: newUser.phonenumber,
                vehicles: input.vehicles || []
            };
            return {token, user};
            }
            catch (error) {
                console.error("Error creating user:", error);
                throw new Error("Failed to create user");
            }
        },

        addVehicle: async (_parent: any, { input }: AddVehicleArgs, context: Context): Promise<User | null> => {
            if (context.user && input) {
                const { vin, year, make, car_model, mileage } = input;
                const newVehicle = { vin, year, make, car_model, mileage };

                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { vehicles: newVehicle } },
                    { new: true }
                );
            };
            throw new Error("Failed to add vehicle");
        },

        // updateVehicle: async (_parent: any, { input }: AddVehicleArgs, context: Context): Promise<User | null> => {
        //     if (context.user && input) {
        //         const { vin, year, make, model } = input;

        //         return await User.findOneAndUpdate(
        //             { _id: context.user._id, 'vehicles.vin': vin },
        //             { $set: {  
        //                 'vehicles.$.year': year,
        //                 'vehicles.$.make': make,
        //                 'vehicles.$.model': model
        //             } },
        //             { new: true }
        //         );
        //     };
        //     throw new Error("Failed to update vehicle");
        // },

        // deleteVehicle: async (_parent: any, { input }: AddUserArgs): Promise<User | null> => {

        // },

        addService: async (_parent: any, { input }: AddServiceArgs, context: Context): Promise<User | null> => {
            if (context.user && input) {
                const { vin, name, serviceType, date_performed, mileage_performed, cost, description, is_overdue } = input;
                const newService = { name, serviceType, date_performed, mileage_performed, cost, description, is_overdue };

                if (!['SERVICE', 'EXPENSE'].includes(serviceType)) {
                    throw new Error('Invalid serviceType');
                }

                return await User.findOneAndUpdate(
                    { _id: context.user._id, 'vehicles.vin': vin },
                    { $push: { 'vehicles.$.services': newService } },
                    { new: true }
                );
            };
            throw new Error("Failed to add service");
        },

        // updateService: async (_parent: any, { input }: AddUserArgs): Promise<User | null> => {

        // },

        // deleteService: async (_parent: any, { input }: AddUserArgs): Promise<User | null> => {

        // },

        // setReminder: async (_parent: any, { input }: AddUserArgs): Promise<User | null> => {
            
        // },
    },
}

export default resolvers;