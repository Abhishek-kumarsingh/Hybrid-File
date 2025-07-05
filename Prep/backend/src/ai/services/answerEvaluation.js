const aiClient = require('../apiClient');
const { buildAnswerEvaluationPrompt } = require('../utils/promptEngineering');
const logger = require('../../utils/logger');

/**
 * Evaluate an interview answer
 * @param {Object} options - Options for answer evaluation
 * @param {Object} options.question - Question object
 * @param {string} options.answer - User's answer text
 * @param {Object} options.jobRole - Job role object
 * @returns {Promise<Object>} - Evaluation object
 */
const evaluateAnswer = async ({ question, answer, jobRole }) => {
  try {
    // Build prompt for AI
    const prompt = buildAnswerEvaluationPrompt({
      question,
      answer,
      jobRole
    });

    // Call AI service to evaluate answer
    const response = await aiClient.generateContent(prompt);
    
    // Parse AI response to extract evaluation
    return parseAIResponse(response);
  } catch (error) {
    logger.error(`Error evaluating answer: ${error.message}`);
    // Return default evaluation if error occurs
    return {
      score: 5,
      strengths: ['Unable to evaluate answer due to technical error'],
      weaknesses: ['Please try again later'],
      suggestions: ['Contact support if this issue persists']
    };
  }
};

/**
 * Parse AI response to extract evaluation
 * @param {string} response - AI response text
 * @returns {Object} - Evaluation object
 */
const parseAIResponse = (response) => {
  try {
    // Attempt to parse as JSON first
    try {
      const parsed = JSON.parse(response);
      if (parsed.score !== undefined) {
        return {
          score: Number(parsed.score),
          strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
          weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : [],
          suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : []
        };
      }
    } catch (e) {
      // Not valid JSON, continue with text parsing
    }
    
    // Parse text format
    const evaluation = {
      score: 5,
      strengths: [],
      weaknesses: [],
      suggestions: []
    };
    
    const lines = response.split('\n');
    let currentSection = null;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('Score:')) {
        const scoreStr = trimmedLine.replace('Score:', '').trim();
        const score = parseInt(scoreStr, 10);
        if (!isNaN(score) && score >= 0 && score <= 10) {
          evaluation.score = score;
        }
      } else if (trimmedLine.toLowerCase().includes('strengths:')) {
        currentSection = 'strengths';
      } else if (trimmedLine.toLowerCase().includes('weaknesses:')) {
        currentSection = 'weaknesses';
      } else if (trimmedLine.toLowerCase().includes('suggestions:')) {
        currentSection = 'suggestions';
      } else if (currentSection && (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* '))) {
        const point = trimmedLine.replace(/^-\s|\*\s/, '').trim();
        if (point) {
          evaluation[currentSection].push(point);
        }
      }
    }
    
    return evaluation;
  } catch (error) {
    logger.error(`Error parsing AI evaluation response: ${error.message}`);
    return {
      score: 5,
      strengths: [],
      weaknesses: [],
      suggestions: []
    };
  }
};

module.exports = {
  evaluateAnswer
};