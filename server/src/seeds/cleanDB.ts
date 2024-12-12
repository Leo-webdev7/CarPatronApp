
import models from '../models/index.js';
const { User, Vehicle, Service } = models;

const cleanDB = async (): Promise<void> => {
  try {
    // Delete all documents from each collection
    await Promise.all([
      User.deleteMany({}),
      Vehicle.deleteMany({}),
      Service.deleteMany({}),
    ]);

    console.log('Database cleaned successfully!');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error cleaning database:', error.message);
    } else {
      console.error('Unknown error cleaning database');
    }
    throw error; // Propagate the error to the caller
  }
};

export default cleanDB;
