const mongoose = require('mongoose');

const JobRoleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job role title is required'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Job role description is required']
  },
  skills: [{
    type: String,
    trim: true
  }],
  categories: [{
    type: String,
    trim: true
  }],
  level: {
    type: String,
    enum: ['entry', 'junior', 'mid', 'senior', 'lead'],
    default: 'mid'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('JobRole', JobRoleSchema);