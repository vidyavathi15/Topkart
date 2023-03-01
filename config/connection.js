import mongoose from "mongoose";



const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect('mongodb://localhost:27017/Topkart')
        console.log(`Mongo Connected: ${conn.connection.host}`);
    }catch(error){
        console.log(error,'Database connection error');
        process.exit(1)
    }
}

export default connectDB;