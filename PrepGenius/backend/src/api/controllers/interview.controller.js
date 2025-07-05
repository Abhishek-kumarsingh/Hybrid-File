const Interview = require('../../models/interview.model');
const Question = require('../../models/question.model');
const Answer = require('../../models/answer.model');
const Feedback = require('../../models/feedback.model');
const { notFound, badRequest } = require('../../utils/errorHandler');
const questionGenerationService = require('../../ai/services/questionGeneration');
const answerEvaluationService = require('../../ai/services/answerEvaluation');
const feedbackGenerationService = require('../../ai/services/feedbackGeneration');

/**
 * @desc    Get all interviews for current user
 * @route   GET /api/interviews
 * @access  Private
 */
const getInterviews = async (req, res, next) => {
  try {
    const interviews = await Interview.find({ user: req.user.id })
      .populate('jobRole', 'title')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: interviews.length,
      data: interviews
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single interview
 * @route   GET /api/interviews/:id
 * @access  Private
 */
const getInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id)
      .populate('jobRole')
      .populate('questions')
      .populate('feedback');

    if (!interview) {
      return next(notFound(`Interview not found with id of ${req.params.id}`));
    }

    // Make sure user owns the interview
    if (interview.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(notFound(`Interview not found with id of ${req.params.id}`));
    }

    res.status(200).json({
      success: true,
      data: interview
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new interview
 * @route   POST /api/interviews
 * @access  Private
 */
const createInterview = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    // Create interview
    const interview = await Interview.create(req.body);

    // Generate questions based on job role and difficulty
    const questions = await questionGenerationService.generateQuestions({
      jobRoleId: interview.jobRole,
      difficulty: interview.difficulty,
      count: 5, // Default number of questions
      jobDescription: interview.jobDescription
    });

    // Add questions to interview
    interview.questions = questions.map(q => q._id);
    await interview.save();

    res.status(201).json({
      success: true,
      data: interview
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update interview
 * @route   PUT /api/interviews/:id
 * @access  Private
 */
const updateInterview = async (req, res, next) => {
  try {
    let interview = await Interview.findById(req.params.id);

    if (!interview) {
      return next(notFound(`Interview not found with id of ${req.params.id}`));
    }

    // Make sure user owns the interview
    if (interview.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(notFound(`Interview not found with id of ${req.params.id}`));
    }

    // Don't allow updating if interview is completed
    if (interview.status === 'completed') {
      return next(badRequest('Cannot update a completed interview'));
    }

    interview = await Interview.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: interview
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete interview
 * @route   DELETE /api/interviews/:id
 * @access  Private
 */
const deleteInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return next(notFound(`Interview not found with id of ${req.params.id}`));
    }

    // Make sure user owns the interview
    if (interview.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(notFound(`Interview not found with id of ${req.params.id}`));
    }

    // Delete all associated answers
    await Answer.deleteMany({ interview: req.params.id });

    // Delete the interview
    await interview.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Start interview
 * @route   PUT /api/interviews/:id/start
 * @access  Private
 */
const startInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return next(notFound(`Interview not found with id of ${req.params.id}`));
    }

    // Make sure user owns the interview
    if (interview.user.toString() !== req.user.id) {
      return next(notFound(`Interview not found with id of ${req.params.id}`));
    }

    // Update interview status and start time
    interview.status = 'in-progress';
    interview.startTime = Date.now();
    interview.currentQuestionIndex = 0;
    await interview.save();

    res.status(200).json({
      success: true,
      data: interview
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Complete interview
 * @route   PUT /api/interviews/:id/complete
 * @access  Private
 */
const completeInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id)
      .populate('questions');

    if (!interview) {
      return next(notFound(`Interview not found with id of ${req.params.id}`));
    }

    // Make sure user owns the interview
    if (interview.user.toString() !== req.user.id) {
      return next(notFound(`Interview not found with id of ${req.params.id}`));
    }

    // Update interview status and end time
    interview.status = 'completed';
    interview.endTime = Date.now();
    await interview.save();

    // Get all answers for this interview
    const answers = await Answer.find({ interview: interview._id })
      .populate('question');

    // Generate feedback
    const feedbackData = await feedbackGenerationService.generateFeedback({
      interview,
      answers,
      user: req.user.id
    });

    // Create feedback record
    const feedback = await Feedback.create(feedbackData);

    // Link feedback to interview
    interview.feedback = feedback._id;
    await interview.save();

    res.status(200).json({
      success: true,
      data: {
        interview,
        feedback
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Submit answer for a question
 * @route   POST /api/interviews/:id/questions/:questionId/answer
 * @access  Private
 */
const submitAnswer = async (req, res, next) => {
  try {
    const { id, questionId } = req.params;
    const { text, audioUrl, duration } = req.body;

    const interview = await Interview.findById(id);
    if (!interview) {
      return next(notFound(`Interview not found with id of ${id}`));
    }

    // Make sure user owns the interview
    if (interview.user.toString() !== req.user.id) {
      return next(notFound(`Interview not found with id of ${id}`));
    }

    // Check if interview is in progress
    if (interview.status !== 'in-progress') {
      return next(badRequest('Cannot submit answer for an interview that is not in progress'));
    }

    // Check if question exists and belongs to this interview
    const question = await Question.findById(questionId);
    if (!question || !interview.questions.includes(questionId)) {
      return next(notFound(`Question not found with id of ${questionId}`));
    }

    // Check if answer already exists
    let answer = await Answer.findOne({
      interview: id,
      question: questionId,
      user: req.user.id
    });

    if (answer) {
      // Update existing answer
      answer.text = text;
      if (audioUrl) answer.audioUrl = audioUrl;
      if (duration) answer.duration = duration;
    } else {
      // Create new answer
      answer = new Answer({
        interview: id,
        question: questionId,
        user: req.user.id,
        text,
        audioUrl,
        duration
      });
    }

    // Evaluate answer
    const evaluation = await answerEvaluationService.evaluateAnswer({
      question,
      answer: text,
      jobRole: interview.jobRole
    });

    answer.evaluation = evaluation;
    await answer.save();

    // Move to next question if available
    if (interview.currentQuestionIndex < interview.questions.length - 1) {
      interview.currentQuestionIndex += 1;
      await interview.save();
    }

    res.status(200).json({
      success: true,
      data: {
        answer,
        nextQuestionIndex: interview.currentQuestionIndex
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current question for interview
 * @route   GET /api/interviews/:id/current-question
 * @access  Private
 */
const getCurrentQuestion = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id)
      .populate('questions');

    if (!interview) {
      return next(notFound(`Interview not found with id of ${req.params.id}`));
    }

    // Make sure user owns the interview
    if (interview.user.toString() !== req.user.id) {
      return next(notFound(`Interview not found with id of ${req.params.id}`));
    }

    // Check if interview is in progress
    if (interview.status !== 'in-progress') {
      return next(badRequest('Interview is not in progress'));
    }

    // Get current question
    const currentQuestion = interview.questions[interview.currentQuestionIndex];

    res.status(200).json({
      success: true,
      data: {
        question: currentQuestion,
        questionIndex: interview.currentQuestionIndex,
        totalQuestions: interview.questions.length
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInterviews,
  getInterview,
  createInterview,
  updateInterview,
  deleteInterview,
  startInterview,
  completeInterview,
  submitAnswer,
  getCurrentQuestion
};

