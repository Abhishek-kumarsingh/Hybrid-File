const aiClient = require('../apiClient');
const { buildFeedbackPrompt } = require('../utils/promptEngineering');
const logger = require('../../utils/logger');

/**
 * Generate comprehensive feedback for an interview
 * @param {Object} options - Options for feedback generation
 * @param {Object} options.interview - Interview object
 * @param {Array} options.answers - Array of answer objects
 * @param {string} options.user - User ID
 * @returns {Promise<Object>} - Feedback object
 */
const generateFeedback = async ({ interview, answers, user }) => {
  try {
    // Calculate average score from answers
    const scores = answers.map(answer => answer.evaluation?.score || 0);
    const overallScore = scores.length > 0 
      ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) 
      : 5;
    
    // Prepare question feedback
    const questionFeedback = answers.map(answer => ({
      question: answer.question._id,
      score: answer.evaluation?.score || 5,
      comments: generateCommentFromEvaluation(answer.evaluation)
    }));
    
    // For simple cases with few answers, we can generate basic feedback
    if (answers.length <= 2) {
      return {
        interview: interview._id,
        user,
        overallScore,
        technicalScore: overallScore,
        communicationScore: overallScore,
        strengths: collectFeedbackPoints(answers, 'strengths'),
        weaknesses: collectFeedbackPoints(answers, 'weaknesses'),
        suggestions: collectFeedbackPoints(answers, 'suggestions'),
        detailedFeedback: generateBasicDetailedFeedback(answers),
        questionFeedback
      };
    }
    
    // For more complex interviews, use AI to generate comprehensive feedback
    const prompt = buildFeedbackPrompt({
      interview,
      answers,
      jobRole: interview.jobRole
    });
    
    // Call AI service to generate feedback
    const response = await aiClient.generateContent(prompt);
    
    // Parse AI response
    const aiFeedback = parseAIResponse(response);
    
    return {
      interview: interview._id,
      user,
      overallScore: aiFeedback.overallScore || overallScore,
      technicalScore: aiFeedback.technicalScore || overallScore,
      communicationScore: aiFeedback.communicationScore || overallScore,
      strengths: aiFeedback.strengths || collectFeedbackPoints(answers, 'strengths'),
      weaknesses: aiFeedback.weaknesses || collectFeedbackPoints(answers, 'weaknesses'),
      suggestions: aiFeedback.suggestions || collectFeedbackPoints(answers, 'suggestions'),
      detailedFeedback: aiFeedback.detailedFeedback || generateBasicDetailedFeedback(answers),
      questionFeedback
    };
  } catch (error) {
    logger.error(`Error generating feedback: ${error.message}`);
    
    // Return basic feedback if error occurs
    const scores = answers.map(answer => answer.evaluation?.score || 0);
    const overallScore = scores.length > 0 
      ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) 
      : 5;
    
    return {
      interview: interview._id,
      user,
      overallScore,
      technicalScore: overallScore,
      communicationScore: overallScore,
      strengths: collectFeedbackPoints(answers, 'strengths'),
      weaknesses: collectFeedbackPoints(answers, 'weaknesses'),
      suggestions: collectFeedbackPoints(answers, 'suggestions'),
      detailedFeedback: "We encountered an issue generating detailed feedback. Please review individual question feedback.",
      questionFeedback: answers.map(answer => ({
        question: answer.question._id,
        score: answer.evaluation?.score || 5,
        comments: generateCommentFromEvaluation(answer.evaluation)
      }))
    };
  }
};

/**
 * Collect feedback points from answer evaluations
 * @param {Array} answers - Array of answer objects
 * @param {string} field - Field to collect (strengths, weaknesses, suggestions)
 * @returns {Array} - Array of unique feedback points
 */
const collectFeedbackPoints = (answers, field) => {
  const points = new Set();
  
  answers.forEach(answer => {
    if (answer.evaluation && Array.isArray(answer.evaluation[field])) {
      answer.evaluation[field].forEach(point => points.add(point));
    }
  });
  
  return Array.from(points).slice(0, 5); // Limit to 5 points
};

/**
 * Generate a comment from evaluation
 * @param {Object} evaluation - Evaluation object
 * @returns {string} - Generated comment
 */
const generateCommentFromEvaluation = (evaluation) => {
  if (!evaluation) return "No evaluation available.";
  
  const { score, strengths = [], weaknesses = [] } = evaluation;
  
  if (score >= 8) {
    return `Excellent answer. ${strengths[0] || 'Good job!'}`;
  } else if (score >= 6) {
    return `Good answer. ${strengths[0] || ''} Consider: ${weaknesses[0] || 'providing more details.'}`;
  } else if (score >= 4) {
    return `Average answer. ${weaknesses[0] || 'Could be improved with more specific examples.'}`;
  } else {
    return `Needs improvement. ${weaknesses[0] || 'Consider reviewing this topic further.'}`;
  }
};

/**
 * Generate basic detailed feedback
 * @param {Array} answers - Array of answer objects
 * @returns {string} - Generated detailed feedback
 */
const generateBasicDetailedFeedback = (answers) => {
  const scores = answers.map(answer => answer.evaluation?.score || 0);
  const avgScore = scores.length > 0 
    ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) 
    : 5;
  
  let feedback = `Overall Interview Performance: ${getScoreDescription(avgScore)}\n\n`;
  
  // Add strengths
  const strengths = collectFeedbackPoints(answers, 'strengths');
  if (strengths.length > 0) {
    feedback += "Strengths:\n";
    strengths.forEach(strength => {
      feedback += `- ${strength}\n`;
    });
    feedback += "\n";
  }
  
  // Add areas for improvement
  const weaknesses = collectFeedbackPoints(answers, 'weaknesses');
  if (weaknesses.length > 0) {
    feedback += "Areas for Improvement:\n";
    weaknesses.forEach(weakness => {
      feedback += `- ${weakness}\n`;
    });
    feedback += "\n";
  }
  
  // Add suggestions
  const suggestions = collectFeedbackPoints(answers, 'suggestions');
  if (suggestions.length > 0) {
    feedback += "Suggestions:\n";
    suggestions.forEach(suggestion => {
      feedback += `- ${suggestion}\n`;
    });
  }
  
  return feedback;
};

/**
 * Get description for a score
 * @param {number} score - Score (0-10)
 * @returns {string} - Score description
 */
const getScoreDescription = (score) => {
  if (score >= 9) return "Outstanding";
  if (score >= 8) return "Excellent";
  if (score >= 7) return "Very Good";
  if (score >= 6) return "Good";
  if (score >= 5) return "Satisfactory";
  if (score >= 4) return "Fair";
  if (score >= 3) return "Needs Improvement";
  return "Unsatisfactory";
};

/**
 * Parse AI response to extract feedback
 * @param {string} response - AI response text
 * @returns {Object} - Feedback object
 */
const parseAIResponse = (response) => {
  try {
    // Attempt to parse as JSON first
    try {
      const parsed = JSON.parse(response);
      return {
        overallScore: Number(parsed.overallScore) || undefined,
        technicalScore: Number(parsed.technicalScore) || undefined,
        communicationScore: Number(parsed.communicationScore) || undefined,
        strengths: Array.isArray(parsed.strengths) ? parsed.strengths : undefined,
        weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : undefined,
        suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : undefined,
        detailedFeedback: parsed.detailedFeedback || undefined
      };
    } catch (e) {
      // Not valid JSON, continue with text parsing
    }
    
    // Parse text format
    const feedback = {
      strengths: [],
      weaknesses: [],
      suggestions: []
    };
    
    const lines = response.split('\n');
    let currentSection = null;
    let detailedFeedback = '';
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('Overall Score:')) {
        const scoreStr = trimmedLine.replace('Overall Score:', '').trim();
        const score = parseInt(scoreStr, 10);
        if (!isNaN(score) && score >= 0 && score <= 10) {
          feedback.overallScore = score;
        }
      } else if (trimmedLine.startsWith('Technical Score:')) {
        const scoreStr = trimmedLine.replace('Technical Score:', '').trim();
        const score = parseInt(scoreStr, 10);
        if (!isNaN(score) && score >= 0 && score <= 10) {
          feedback.technicalScore = score;
        }
      } else if (trimmedLine.startsWith('Communication Score:')) {
        const scoreStr = trimmedLine.replace('Communication Score:', '').trim();
        const score = parseInt(scoreStr, 10);
        if (!isNaN(score) && score >= 0 && score <= 10) {
          feedback.communicationScore = score;
        }
      } else if (trimmedLine.toLowerCase().includes('strengths:')) {
        currentSection = 'strengths';
      } else if (trimmedLine.toLowerCase().includes('weaknesses:') || 
                trimmedLine.toLowerCase().includes('areas for improvement:')) {
        currentSection = 'weaknesses';
      } else if (trimmedLine.toLowerCase().includes('suggestions:')