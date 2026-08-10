import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Lightsaber from './models/Lightsaber.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware = server gaat eerst door de middleware heen voordat het bij je route komt
app.use(cors());
app.use(express.json());

// Verbinding maken met MongoDB Atlas en pas daarna de server starten
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas successfully!");
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

// Test route
app.get('/', (req, res) => {
  res.json({ message: "Star Wars API is running" });
});