import mongoose from "mongoose";
import { DB_URI , NODE_ENV} from "../config/env.js";


if (!DB_URI) {
    throw new Error('please define DB_URI in your .env.<production|development>.local file');
    
}

const connectToMongoDB = async () => {
    try{
        await mongoose.connect(DB_URI);
        console.log(`Connected to MongoDB in ${NODE_ENV} mode`);
    }catch(error){
        console.error('Error connecting to MongoDB: ', error);
        process.exit(1);
    }
};
export default connectToMongoDB;