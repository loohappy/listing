import mongoose from "mongoose";
import "dotenv/config";
const MONGODB_URI: string | undefined = process.env.MONGODB_CONNECTION_STRING;
async function connectDB(): Promise<void> {
  try {
    if (!MONGODB_URI) {
      throw new Error("MongoDB URI is not defined");
    }
    console.log(MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if the connection fails
  }
}

async function disconnectDB(): Promise<void> {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
  }
}

export { connectDB, disconnectDB };
