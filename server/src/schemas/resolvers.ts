import User from '../models/User.js';
import { signToken, AuthenticationError } from '../services/auth.js';

interface User {
    _id: string;
  username: string;
  email: string;
  phonenumber:string;
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

interface AddServiceArgs {
    input: {
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
  }
}

interface Context {
    user: User;
}

const resolvers = { 
    Query: {
        me: async (_parent: any, _args: any, context: Context): Promise<User | null> => {
            if (context.user) {
                return await User.findOne({_id:context.user._id});
            }
            throw AuthenticationError;
        },
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
            }

            const token = signToken(user.username, user.email, user._id);

            return {token, user};
        },

        addUser: async (_parent: any, {input}: AddUserArgs): Promise<{token: string; user: User}> => {
            try {
            const newUser = await User.create({...input});
            const token = signToken(newUser.username, newUser.email, newUser._id);
            const user: User = {
                _id: newUser._id as string,
                username: newUser.username,
                email: newUser.email,
                phonenumber: newUser.phonenumber,
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

        updateVehicle: async (_parent: any, { input }: AddVehicleArgs, context: Context): Promise<User | null> => {
            if (context.user && input) {
                const { vin, year, make, model } = input;

                return await User.findOneAndUpdate(
                    { _id: context.user._id, 'vehicles.vin': vin },
                    { $set: {  
                        'vehicles.$.year': year,
                        'vehicles.$.make': make,
                        'vehicles.$.model': model
                    } },
                    { new: true }
                );
            };
            throw new Error("Failed to update vehicle");
        },

        // deleteVehicle: async (_parent: any, { input }: AddUserArgs): Promise<User | null> => {

        // },

        // addService: async (_parent: any, { input }: AddUserArgs): Promise<User | null> => {
            
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