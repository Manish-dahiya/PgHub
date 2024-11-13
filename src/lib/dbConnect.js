import mongoose from "mongoose"

let isConnected = null; // Track the connection state

const connectToDatabase = async () => {
  if (isConnected) {
    console.log('=> Using existing database connection');
    return mongoose.connection;
  }
  // If not connected, create a new connection
  try {
    console.log(process.env.MONGODB_URL)
    const mongoURI = process.env.MONGODB_URL; // Get your MongoDB URI from the environment variables
    console.log(mongoURI)
    if (!mongoURI) {
      throw new Error('Please add your Mongo URI to .env.local');
    }

    const db = await mongoose.connect(mongoURI);

    isConnected = db.connections[0].readyState; // Track the connection status (1 means connected)
    console.log('=> New database connection created');

    return mongoose.connection;
  } catch (error) {
    console.error('Error connecting to database', error);
    // throw new Error('Failed to connect to database');
  }
};
export default connectToDatabase;

