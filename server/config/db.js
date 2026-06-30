const mongoose = require("mongoose");

const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    const fallbackUri = process.env.MONGO_URI_FALLBACK;
    const activeUri = uri || fallbackUri;

    if (!activeUri) {
        console.error("MongoDB connection failed: MONGO_URI is not defined");
        process.exit(1);
    }

    const safeUri = activeUri.replace(/(mongodb\+srv:\/\/)([^:]+):([^@]+)@/, "$1***:***@");
    console.log("Connecting to MongoDB using URI:", safeUri);

    const connectOptions = {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
    };

    try {
        await mongoose.connect(activeUri, connectOptions);
        console.log("MongoDB connected successfully");
        return;
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);

        if (uri && uri.startsWith("mongodb+srv://") && fallbackUri) {
            const safeFallback = fallbackUri.replace(/(mongodb\+srv:\/\/)([^:]+):([^@]+)@/, "$1***:***@");
            console.log("Retrying with MONGO_URI_FALLBACK:", safeFallback);
            try {
                await mongoose.connect(fallbackUri, connectOptions);
                console.log("MongoDB connected successfully using fallback URI");
                return;
            } catch (fallbackError) {
                console.error("Fallback MongoDB connection failed:", fallbackError.message);
            }
        }

        process.exit(1);
    }
};

module.exports = connectDB;
