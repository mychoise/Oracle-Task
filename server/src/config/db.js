import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
	throw new Error("MONGODB_URI is not defined");
  }

  try {
	const connection = await mongoose.connect(uri);
	console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
	console.error("MongoDB connection error:", error.message);
	throw error;
  }
};

export default connectDB;

