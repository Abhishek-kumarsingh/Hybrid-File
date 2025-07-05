const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  interview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
    required: true
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  audioUrl: {
    type: String
  },
  duration: {
    type: Number, // in seconds
    default: 0
  },
  evaluation: {
    score: {
      type: Number,
      min: 0,
      max: 10,
      default: 0
    },
    strengths: [{
      type: String
    }],
    weaknesses: [{
      type: String
    }],
    suggestions: [{
      type: String
    }]
  },
  keywordsDetected: [{
    type: String
  }],
  grammarErrors: [{
    original: String,
    suggestion: String,
    offset: Number,
    length: Number
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Answer', AnswerSchema);