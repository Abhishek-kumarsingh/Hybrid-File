const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Interview title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  jobRole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobRole',
    required: true
  },
  mode: {
    type: String,
    enum: ['text', 'voice', 'video'],
    default: 'text'
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  duration: {
    type: Number, // in minutes
    default: 30
  },
  startTime: {
    type: Date
  },
  endTime: {
    type: Date
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  currentQuestionIndex: {
    type: Number,
    default: 0
  },
  resumeUrl: {
    type: String
  },
  jobDescription: {
    type: String
  },
  feedback: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feedback'
  },
  settings: {
    followUpQuestions: {
      type: Boolean,
      default: true
    },
    realTimeTranscription: {
      type: Boolean,
      default: true
    },
    detailedFeedback: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for interview progress percentage
InterviewSchema.virtual('progress').get(function() {
  if (!this.questions || this.questions.length === 0) return 0;
  return Math.round((this.currentQuestionIndex / this.questions.length) * 100);
});

// Virtual for interview duration in minutes
InterviewSchema.virtual('durationInMinutes').get(function() {
  if (!this.startTime || !this.endTime) return 0;
  return Math.round((this.endTime - this.startTime) / (1000 * 60));
});

module.exports = mongoose.model('Interview', InterviewSchema);