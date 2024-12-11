import db from '../config/connection.js';
import models from '../models/index.js';
const { User } = models;
import userSeeds from './userData.json' assert { type: "json" };
import cleanDB from './cleanDB.js';

const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    // The seeded users don't have hashed passwords, so auth doesn't work
    await User.insertMany(userSeeds);

    console.log(`Seeding completed successfully! ${userSeeds.length} user(s) inserted!`);
    process.exit(0);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error seeding database:', error.message);
    } else {
      console.error('Unknown error seeding database');
    }
    process.exit(1);
  }
};

seedDatabase();