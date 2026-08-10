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

// Route om een nieuwe Lightsaber aan te maken (POST)
app.post('/api/lightsabers', async (req, res) => {
  try {
    // We maken een nieuw lightsaberobject aan met de data die de frontend meestuurt
    const newLightsaber = new Lightsaber(req.body);
    
    // We slaan die op in MongoDB Atlas
    const savedLightsaber = await newLightsaber.save();
    
    // We sturen een goed antwoord terug naar de frontend met de opgeslagen data
    res.status(201).json(savedLightsaber);
  } catch (error) {
    // Als er iets misgaat   , vangen we de fout op
    res.status(400).json({ message: error.message });
  }
});
// Route om alle Lightsabers op te halen (GET)
app.get('/api/lightsabers', async (req, res) => {
  try {
    const lightsabers = await Lightsaber.find();
    res.status(200).json(lightsabers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});