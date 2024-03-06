import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
const {URL}=process.env
export function dbConnection()

{
    
    try{
        mongoose.connect(URL);
        console.log("Database connected Successfully")
    }catch(error)
    {
        console.log("Error connecting DB", error)
    }
}