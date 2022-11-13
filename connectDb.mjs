import dotenv from 'dotenv';
import mongoose from 'mongoose';

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const dbUrl = process.env.DB_URL;

export const dbConnect = async () => {

  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Successfully connected to MongoDB Atlas!");
  });
    
}