import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    await mongoose.connect(process.env.MongoURL, {
      dbName: "digital_wallet",
    });

    console.log(" MongoDB connected successfully");
  } catch (error) {
    console.error(" MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
};

export default connectDB;
