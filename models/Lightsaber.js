import mongoose from 'mongoose';

const lightsaberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  crystalColor: {
    type: String,   
    required: true,
    lowercase: true,
    enum: ['blue', 'red', 'green', 'purple', 'yellow', 'white']
  },
  hiltType: {
    type: String,
    required: true,
    lowercase: true,
    enum: ['single', 'double', 'crossguard']
  },
  ownerSide: {
    type: String,
    required: true,
    lowercase: true,
    enum: ['Jedi', 'Sith']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Lightsaber = mongoose.model('Lightsaber', lightsaberSchema); // JS code kan data opvragen, toevoegen, wijzigen en verwijderen in MongoDB.

export default Lightsaber;