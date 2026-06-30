const mongoose = require("mongoose");

const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error("MongoDB connection failed: MONGO_URI is not defined");
        process.exit(1);
    }

    const safeUri = uri.replace(/(mongodb\+srv:\/\/)([^:]+):([^@]+)@/, "$1***:***@");
    console.log("Connecting to MongoDB using URI:", safeUri);

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
