import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("establised connection with db successfully");
    } catch (error) {
        console.log(`error while connecting to db`, error);
        process.exit(1);
    }
}