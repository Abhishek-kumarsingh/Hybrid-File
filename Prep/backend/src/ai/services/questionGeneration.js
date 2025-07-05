const Question = require('../../models/question.model');
const JobRole = require('../../models/jobRole.model');
const aiClient = require('../apiClient');
const { buildQuestionPrompt } = require('../utils/promptEngineering');
const logger = require('../../utils/logger');

/**
 * Generate interview questions based on job role and difficulty
 * @param {Object} options - Options for question generation
 * @param {string} options.jobRoleId - ID of the job role
 * @param {string} options.difficulty - Difficulty level (easy, medium, hard)
 * @param {number} options.count - Number of questions to generate
 * @param {string} options.jobDescription - Optional job description for more tailored questions
 * @returns {Promise<Array>} - Array of question objects
 */
const generateQuestions = async ({ jobRoleId, difficulty, count = 5, jobDescription = '' }) => {
  try {
    // First, check if we have existing questions for this job role and difficulty
    const existingQuestions = await Question.find({
      jobRoles: jobRoleId,
      difficulty,
      isCustom: false
    }).limit(count);

    // If we have enough existing questions, return them
    if (existingQuestions.length >= count) {
      // Randomly select 'count' questions from existing questions
      return existingQuestions.sort(() => 0.5 - Math.random()).slice(0, count);
    }

    // Get job role details
    const jobRole = await JobRole.findById(jobRoleId);
    if (!jobRole) {
      throw new Error(`Job role with ID ${jobRoleId} not found`);
    }

    // Build prompt for AI
    const prompt = buildQuestionPrompt({
      jobRole,
      difficulty,
      count: count - existingQuestions.length,
      jobDescription
    });

    // Call AI service to generate questions
    const response = await aiClient.generateContent(prompt);
    
    // Parse AI response to extract questions
    const generatedQuestions = parseAIResponse(response);
    
    // Save generated questions to database
    const savedQuestions = await Promise.all(
      generatedQuestions.map(async (q) => {
        const question = new Question({
          text: q.text,
          type: q.type || 'technical',
          difficulty,
          category: q.category || jobRole.title,
          jobRoles: [jobRoleId],
          expectedAnswerPoints: q.expectedAnswerPoints || [],
          isCustom: false
        });
        return await question.save();
      })
    );
    
    // Combine existing and newly generated questions
    return [...existingQuestions, ...savedQuestions];
  } catch (error) {
    logger.error(`Error generating questions: ${error.message}`);
    throw error;
  }
};

/**
 * Parse AI response to extract questions
 * @param {string} response - AI response text
 * @returns {Array} - Array of question objects
 */
const parseAIResponse = (response) => {
  try {
    // Attempt to parse as JSON first
    try {
      const parsed = JSON.parse(response);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      if (parsed.questions && Array.isArray(parsed.questions)) {
        return parsed.questions;
      }
    } catch (e) {
      // Not valid JSON, continue with text parsing
    }
    
    // Parse text format
    const questions = [];
    const lines = response.split('\n');
    let currentQuestion = null;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Check if line starts a new question
      if (/^Q\d+:|^Question \d+:|^\d+\.\s/.test(trimmedLine)) {
        // Save previous question if exists
        if (currentQuestion) {
          questions.push(currentQuestion);
        }
        
        // Start new question
        currentQuestion = {
          text: trimmedLine.replace(/^Q\d+:|^Question \d+:|^\d+\.\s/, '').trim(),
          type: 'technical',
          category: '',
          expectedAnswerPoints: []
        };
      } 
      // Check if line contains expected answer points
      else if (currentQuestion && (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* '))) {
        const point = trimmedLine.replace(/^-\s|\*\s/, '').trim();
        currentQuestion.expectedAnswerPoints.push(point);
      }
      // Check if line contains category or type information
      else if (currentQuestion && (trimmedLine.startsWith('Category:') || trimmedLine.startsWith('Type:'))) {
        const [key, value] = trimmedLine.split(':').map(s => s.trim());
        if (key.toLowerCase() === 'category') {
          currentQuestion.category = value;
        } else if (key.toLowerCase() === 'type') {
          currentQuestion.type = value.toLowerCase();
        }
      }
      // Append to current question text if not empty
      else if (currentQuestion && trimmedLine && !trimmedLine.startsWith('Answer:')) {
        currentQuestion.text += ' ' + trimmedLine;
      }
    }
    
    // Add the last question
    if (currentQuestion) {
      questions.push(currentQuestion);
    }
    
    return questions;
  } catch (error) {
    logger.error(`Error parsing AI response: ${error.message}`);
    return [];
  }
};

module.exports = {
  generateQuestions
};
