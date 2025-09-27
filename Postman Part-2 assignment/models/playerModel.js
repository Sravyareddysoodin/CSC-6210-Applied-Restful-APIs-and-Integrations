const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Player name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    match: [/^[\p{L}\s]+$/u, 'Name must contain only letters and spaces']
  },
  shirt: {
    type: Number,
    required: [true, 'Shirt number is required'],
    min: [0, 'Shirt number cannot be negative'],
    max: [99, 'Shirt number cannot exceed 99'],
    unique: true
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: {
      values: ['goalkeeper', 'defender', 'midfielder', 'forward'],
      message: '{VALUE} is not a valid role'
    },
    lowercase: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [16, 'Age must be at least 16'],
    max: [50, 'Age cannot exceed 50']
  },
  nationality: {
    type: String,
    required: [true, 'Nationality is required'],
    trim: true,
    minlength: [2, 'Nationality must be at least 2 characters']
  },
  appearances: {
    type: Number,
    required: [true, 'Appearances is required'],
    min: [0, 'Appearances cannot be negative']
  },
  goals: {
    type: Number,
    required: [true, 'Goals is required'],
    min: [0, 'Goals cannot be negative']
  },
  assists: {
    type: Number,
    required: [true, 'Assists is required'],
    min: [0, 'Assists cannot be negative']
  },
  cleanSheets: {
    type: Number,
    required: [true, 'Clean sheets is required'],
    min: [0, 'Clean sheets cannot be negative']
  },
  injured: {
    type: Boolean,
    required: [true, 'Injured status is required']
  },
  isCaptain: {
    type: Boolean,
    required: [true, 'Captain status is required']
  },
  contractYears: {
    type: Number,
    required: [true, 'Contract years is required'],
    min: [0, 'Contract years cannot be negative']
  }
});

module.exports = mongoose.model('Player', playerSchema);