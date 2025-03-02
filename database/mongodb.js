import mongoose from "mongoose";
import { MONGO_URI , NODE_ENV} from "../config/env.js";


if (!MONGO_URI) {
    throw new Error('please define MONGO_URI in your .env<production|development>.local file');
    
}