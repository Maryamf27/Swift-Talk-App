import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("✅ Database Connected!"))
        mongoose.connection.on('error', (error) => console.error("❌ Database Error:", error))
        
        console.log("🔗 Connecting to MongoDB...");
        console.log("Connection URI:", process.env.MONGODB_URI);
        
        await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`, {
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000,
        });
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1); // Exit if can't connect to DB
    }
}