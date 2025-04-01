// import mongoose from "mongoose"


// export const connectMongoDB = async()=>{
//     if(mongoose.connection.readyState===1){
//         return mongoose.connection.asPromise();
//     }
//     return await mongoose.connect(process.env.MONGO_URI!);
// };

import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
            console.log("Using existing MongoDB connection.");
            return mongoose.connection;
        }
        
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("MongoDB connected successfully.");
        
        return mongoose.connection;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Failed to connect to MongoDB");
    }
};
