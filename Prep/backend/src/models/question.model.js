const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['technical', 'behavioral', 'situational', 'general'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  jobRoles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobRole'
  }],
  expectedAnswerPoints: [{
    type: String,
    trim: true
  }],
  followUpQuestions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  isCustom: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,