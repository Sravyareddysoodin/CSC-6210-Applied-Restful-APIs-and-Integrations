const express = require('express');
const router = express.Router();
const Player = require('../models/playerModel');
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
  const { name, shirt, role, age, nationality, appearances, goals, assists, cleanSheets, injured, isCaptain, contractYears } = req.body;
  try {
    const player = await Player.create({ name, shirt, role, age, nationality, appearances, goals, assists, cleanSheets, injured, isCaptain, contractYears });
    res.status(200).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid player ID' });
  }
  try {
    const player = await Player.findById(id);
    if (!player) {
      return res.status(404).json({ error: 'Player does not exist' });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid player ID' });
  }
  try {
    const player = await Player.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { runValidators: true, new: true }
    );
    if (!player) {
      return res.status(404).json({ error: 'Player does not exist' });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid player ID' });
  }
  try {
    const player = await Player.findOneAndDelete({ _id: id });
    if (!player) {
      return res.status(404).json({ error: 'Player does not exist' });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;