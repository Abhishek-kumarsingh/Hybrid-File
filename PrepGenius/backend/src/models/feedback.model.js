const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  interview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  overallScore: {
    type: Number,
    min: 0,
    max: 10,
    required: true
  },
  technicalScore: {
    type: Number,
    min: 0,
    max: 10
  },
  communicationScore: {
    type: Number,
    min: 0,
    max: 10
  },
  strengths: [{
    type: String
  }],
  weaknesses: [{
    type: String
  }],
  suggestions: [{
    type: String
  }],
  detailedFeedback: {
    type: String
  },
  questionFeedback: [{
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    },
    score: {
      type: Number,
      min: 0,
      max: 10
    },
    comments: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Feedback', FeedbackSchema);