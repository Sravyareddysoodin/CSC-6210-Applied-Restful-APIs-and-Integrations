const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Player = require('./models/playerModel');
const fs = require('fs');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    const players = JSON.parse(fs.readFileSync('mufc_players.json', 'utf8'));
    try {
      await Player.deleteMany({}); // Clear existing players
      await Player.insertMany(players);
      console.log('Players imported successfully');
      mongoose.connection.close();
    } catch (error) {
      console.error('Error importing players:', error);
      mongoose.connection.close();
    }
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });