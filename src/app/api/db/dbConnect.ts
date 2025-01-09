// lib/mongoose.js
import mongoose from 'mongoose';

const MONGODB_URI:string = process.env.MONGODB_URI || '';  // Your MongoDB URI

export default async function dbConnect() {
  try{
    await mongoose.connect(MONGODB_URI)
  }catch(err){
    console.error('MongoDB connection error:', err)
    throw new Error('Failed to connect to MongoDB')
  }
}
