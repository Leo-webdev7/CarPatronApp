import User from '../models/User.js';
import Vehicle from '../models/Vehicle.js'
import Service from '../models/Service.js'
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
    model: string;
    services: Service[];
}

interface AddVehicleArgs {
    input: {
        vin: string;
        year: string;
        make: string;
        model: string;
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

// interface AddServiceArgs {
//     input: {
//         vin: string;
//         name: string;
//         date_performed: string;
//         mileage_performed: number;
//         cost: number;
//         description: string;
//         is_overdue: boolean;
//     }
// }

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
        // getUserVehicles: async (): Promise<null> => {
        //     return null
        // },
        // getVehicle: async (_parent: any, _args: any, context: Context): Promise<Vehicle | null> => {
        //     if (context.user) {
        //         return await Vehicle.findOne({_id:context.vehicle.vin})
        //     }
        //     // Vehicle not found error
        //     throw GraphQLError;
        // },
        // getServiceDetails: async (_parent: any, _args: any, context: Context): => {

        // }
    },
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
                const { vin, year, make, model } = input;
                const newVehicle = { vin, year, make, model };

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

        // addService: async (_parent: any, { input }: AddServiceArgs, context: Context): Promise<User | null> => {
        //     if (context.user && input) {
        //         const { vin, name, date_performed, mileage_performed, cost, description, is_overdue } = input;
        //         const newService = { name, date_performed, mileage_performed, cost, description, is_overdue };

        //         return await User.findOneAndUpdate(
        //             { _id: context.user._id, 'vehicles.vin': { vin } },
        //             { $addToSet: { 'vehicles.services': newService } },
        //             { new: true }
        //         );
        //     };
        //     throw new Error("Failed to add service");
        // },

        // updateService: async (_parent: any, { input }: AddUserArgs): Promise<User | null> => {

        // },

        // deleteService: async (_parent: any, { input }: AddUserArgs): Promise<User | null> => {

        // },

        // setReminder: async (_parent: any, { input }: AddUserArgs): Promise<User | null> => {
            
        // },
    },
}

export default resolvers;