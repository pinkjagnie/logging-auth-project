import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

const connectToDatabase = async () => mongoose.connect(uri);

export default connectToDatabase;