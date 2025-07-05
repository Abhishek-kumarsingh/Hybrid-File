const Feedback = require('../../models/feedback.model');
const Interview = require('../../models/interview.model');
const { notFound } = require('../../utils/errorHandler');

/**
 * @desc    Get all feedback for current user
 * @route   GET /api/feedback
 * @access  Private
 */
const getFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.find({ user: req.user.id })
      .populate({
        path: 'interview',
        select: 'title jobRole startTime endTime',
        populate: {
          path: 'jobRole',
          select: 'title'
        }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: feedback.length,
      data: feedback
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single feedback
 * @route   GET /api/feedback/:id
 * @access  Private
 */
const getSingleFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate({
        path: 'interview',
        populate: {
          path: 'jobRole',
          select: 'title'
        }
      })
      .populate({
        path: 'questionFeedback.question',
        select: 'text type category difficulty'
      });

    if (!feedback) {
      return next(notFound(`Feedback not found with id of ${req.params.id}`));
    }

    // Make sure user owns the feedback
    if (feedback.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(notFound(`Feedback not found with id of ${req.params.id}`));
    }

    res.status(200).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get feedback for an interview
 * @route   GET /api/interviews/:interviewId/feedback
 * @access  Private
 */
const getInterviewFeedback = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.interviewId);
    
    if (!interview) {
      return next(notFound(`Interview not found with id of ${req.params.interviewId}`));
    }

    // Make sure user owns the interview
    if (interview.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(notFound(`Interview not found with id of ${req.params.interviewId}`));
    }

    const feedback = await Feedback.findOne({ interview: req.params.interviewId })
      .populate({
        path: 'questionFeedback.question',
        select: 'text type category difficulty'
      });

    if (!feedback) {
      return next(notFound(`Feedback not found for interview with id of ${req.params.interviewId}`));
    }

    res.status(200).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFeedback,
  getSingleFeedback,
  getInterviewFeedback
};