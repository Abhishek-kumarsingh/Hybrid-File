// src/services/geminiService.ts

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  GenerationConfig,
  // Content, // Not directly used in this version but could be for more complex chat
} from "@google/generative-ai";
import dotenv from "dotenv";
import axios from "axios";
// import { log } from "node:console"; // 'log' is not standard, console.log is fine

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const USE_LOCAL_LLM = process.env.USE_LOCAL_LLM === "true"; // Toggle via environment variable
const LOCAL_LLM_URL =
  process.env.LOCAL_LLM_URL || "http://localhost:11434/v1/chat/completions"; // Common Ollama URL
const LOCAL_MODEL_NAME = process.env.LOCAL_LLM_MODEL_NAME || "mistral"; // Or "llama3", "gemma", etc.

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

const defaultGenerationConfig: GenerationConfig = {
  temperature: 0.6, // Slightly lower for more factual/consistent JSON
  topK: 1,
  topP: 1,
  maxOutputTokens: 4096, // Increased for potentially larger JSON output
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// --- Helper function to interact with the chosen LLM ---
async function generateTextWithLLM(
  prompt: string,
  expectJson: boolean = false
): Promise<string> {
  let llmResponseText: string | null = null;

  if (USE_LOCAL_LLM) {
    console.log(
      `Attempting to use local LLM: ${LOCAL_MODEL_NAME} at ${LOCAL_LLM_URL}`
    );
    try {
      const requestBody: any = {
        model: LOCAL_MODEL_NAME,
        messages: [{ role: "user", content: prompt }],
        temperature: defaultGenerationConfig.temperature,
        // stream: false, // Ensure not streaming for this use case
      };
      if (expectJson) {
        // Some local LLMs (like Ollama with certain models) support a json format flag
        requestBody.format = "json";
        // Or you might add "Ensure your response is a single, valid JSON object." to the prompt itself.
      }

      const response = await axios.post(
        LOCAL_LLM_URL,
        requestBody,
        { timeout: 60000 } // Increased timeout for potentially longer generation
      );
      if (
        response.data &&
        response.data.choices &&
        response.data.choices[0] &&
        response.data.choices[0].message
      ) {
        llmResponseText = response.data.choices[0].message.content.trim();
        console.log("Local LLM Response received.");
      } else {
        console.warn("Local LLM response format unexpected:", response.data);
      }
    } catch (error: any) {
      console.warn(
        `Local LLM (${LOCAL_MODEL_NAME}) call failed: ${error.message}. Falling back to Gemini if configured.`
      );
      if (error.response)
        console.warn("Local LLM Error Data:", error.response.data);
      llmResponseText = null; // Ensure fallback
    }
  }

  if (llmResponseText !== null) {
    return llmResponseText;
  }

  // Fallback to Gemini if local LLM failed or was not used
  if (!genAI) {
    console.error(
      "Gemini API key not configured, and local LLM failed or was not enabled."
    );
    throw new Error(
      "LLM service not available. Configure Gemini API key or a local LLM."
    );
  }

  console.log("Using Gemini API.");
  const modelName = expectJson
    ? "gemini-1.5-flash-latest"
    : "gemini-1.5-flash-latest"; // Use 1.5 for better JSON, or "gemini-pro"
  const model = genAI.getGenerativeModel({
    model: modelName, // gemini-1.5-flash supports JSON mode well
    generationConfig: {
      ...defaultGenerationConfig,
      ...(expectJson && { responseMimeType: "application/json" }), // Request JSON output from Gemini 1.5
    },
    safetySettings,
  });

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    console.log("Gemini API Response received.");
    return response.text().trim();
  } catch (error: any) {
    console.error("Gemini API call failed:", error);
    throw new Error(`Gemini API error: ${error.message}`);
  }
}

// --- Interface Definitions for Structured Analysis ---
export interface GeneratedQuestion {
  question: string;
}

export interface QuestionFeedback {
  feedback: string;
  score?: number; // 0-100
}

export interface AnalyzedSkill {
  name: string; // e.g., "Problem Solving", "React Proficiency"
  score: number; // 0-100
  // examples?: string[]; // Optional: specific examples from answers/feedback
}

export interface AnalyzedTheme {
  theme: string; // e.g., "Strong Technical Foundation", "Needs More Depth in X"
  occurrences: number; // Estimated count
  sentimentScore: number; // Example: -1 (negative) to 1 (positive), or adjust scale
  examples: string[]; // 1-2 short quote snippets
}

export interface AnalyzedRecommendation {
  type: "positive" | "negative" | "neutral";
  text: string; // Concise recommendation
}

export interface ComprehensiveAnalysisResult {
  overallFeedback: string;
  overallScore: number; // 0-100
  skills: AnalyzedSkill[];
  themes: AnalyzedTheme[];
  recommendations: AnalyzedRecommendation[];
}

// --- API Function Implementations ---

export async function generateInterviewQuestions(
  domain: string,
  subDomain: string,
  level: string,
  numQuestions: number = 5,
  existingQuestions: string[] = []
): Promise<GeneratedQuestion[]> {
  const existingQuestionsPrompt =
    existingQuestions.length > 0
      ? `\n\nCRITICALLY IMPORTANT: Avoid generating questions similar to these already existing ones:\n${existingQuestions
          .map((q) => `- ${q}`)
          .join("\n")}`
      : "";

  const prompt = `
You are an expert technical interviewer.
Your task is to generate ${numQuestions} unique and insightful interview questions for a candidate being interviewed for a ${level}-level role in the ${domain} domain, with a specific focus on ${subDomain}.
The questions should be technical and designed to thoroughly assess the candidate's skills, depth of knowledge, and problem-solving abilities relevant to the specified role and technologies.
Format your output as a plain list of questions, with each question on a new line.
Do NOT include any preamble, numbering, bullet points, or any text other than the questions themselves.
For example:
What are the key differences between server-side rendering (SSR) and client-side rendering (CSR) in React?
Explain the concept of virtual DOM and its benefits.
${existingQuestionsPrompt}
`;
  console.log(
    "Generating interview questions with prompt:",
    prompt.substring(0, 200) + "..."
  );
  const text = await generateTextWithLLM(prompt);

  const questions = text
    .split("\n")
    .map((q) =>
      q
        .trim()
        .replace(/^- /, "")
        .replace(/^\d+\.\s*/, "")
    ) // Remove leading hyphens or numbering
    .filter((q) => q.length > 10) // Filter out very short or empty lines
    .slice(0, numQuestions);

  if (questions.length < numQuestions) {
    console.warn(
      `LLM generated fewer than requested questions. Expected ${numQuestions}, got ${questions.length}.`
    );
  }
  if (questions.length === 0) {
    throw new Error(
      "The LLM failed to generate any valid questions. Please check the prompt or LLM configuration."
    );
  }

  return questions.map((q) => ({ question: q }));
}

export async function getFeedbackOnAnswer(
  question: string,
  answer: string,
  domain: string,
  subDomain: string,
  level: string
): Promise<QuestionFeedback> {
  if (!answer || answer.trim().length < 5) {
    // Reduced length check slightly
    return {
      feedback:
        "The candidate did not provide a substantial answer, or the answer was too short for meaningful feedback.",
      score: 0,
    };
  }

  const prompt = `
You are an expert technical interviewer providing feedback on a candidate's answer.
The interview is for a ${level}-level role in the ${domain} domain, focusing on ${subDomain}.

QUESTION ASKED:
"${question}"

CANDIDATE'S ANSWER:
"${answer}"

Please provide:
1. Concise, constructive feedback on the candidate's answer. Focus on correctness, completeness, clarity, and any potential areas for improvement or follow-up.
2. On a SEPARATE NEW LINE, provide a numerical score for this specific answer on a scale of 0 to 100. Format it STRICTLY as: "SCORE: [number]". For example: "SCORE: 85".

Example Output:
The candidate correctly identified the main concept but missed explaining a key aspect. They could improve by elaborating on X.
SCORE: 75
`;
  console.log(
    "Requesting feedback on answer with prompt:",
    prompt.substring(0, 200) + "..."
  );
  const text = await generateTextWithLLM(prompt);

  const lines = text.split("\n");
  const scoreLineIndex = lines.findIndex((line) =>
    line.toUpperCase().startsWith("SCORE:")
  );

  let score: number | undefined = undefined;
  let feedbackText = text.trim(); // Default to full text if SCORE line not found

  if (scoreLineIndex !== -1) {
    const scoreLine = lines[scoreLineIndex];
    const match = scoreLine.match(/SCORE:\s*(\d+)/i);
    if (match && match[1]) {
      score = parseInt(match[1], 10);
      if (isNaN(score) || score < 0 || score > 100) score = undefined; // Validate score
    }
    // Join lines before the score line, or all lines if score is last/not found properly
    feedbackText = lines.slice(0, scoreLineIndex).join("\n").trim();
    if (!feedbackText && lines.length > scoreLineIndex + 1) {
      // If score was first, take lines after
      feedbackText = lines
        .slice(scoreLineIndex + 1)
        .join("\n")
        .trim();
    } else if (!feedbackText && lines.length === 1 && scoreLineIndex === 0) {
      // Only score line returned
      feedbackText =
        "AI provided a score but no textual feedback for this answer.";
    }
  } else {
    console.warn(
      "SCORE line not found in LLM response for feedback on answer. Score will be undefined."
    );
  }
  if (!feedbackText)
    feedbackText = "No textual feedback was generated for this answer.";

  return { feedback: feedbackText, score };
}

// This function is now the main analysis engine
export async function performComprehensiveInterviewAnalysis(interviewDetails: {
  domain: string;
  subDomain: string;
  level: string;
  questionsAndAnswers: Array<{
    question: string;
    answer: string;
    feedback?: string | null; // Now explicitly allow null
    score?: number | null;
  }>;
}): Promise<ComprehensiveAnalysisResult> {
  let qaDetails =
    "The candidate was asked the following questions and provided these answers with corresponding feedback:\n";
  interviewDetails.questionsAndAnswers.forEach((qa, index) => {
    qaDetails += `\n--- Question ${index + 1} ---\n`;
    qaDetails += `Question: ${qa.question}\n`;
    qaDetails += `Candidate's Answer: ${qa.answer || "No answer provided."}\n`;
    if (qa.feedback) qaDetails += `Feedback on Answer: ${qa.feedback}\n`;
    if (qa.score !== null && qa.score !== undefined)
      qaDetails += `Score for Answer: ${qa.score}/100\n`;
  });

  const prompt = `
You are an expert Senior Hiring Manager providing a comprehensive analysis of a technical interview.
The interview was for a ${interviewDetails.level}-level role in the ${interviewDetails.domain} domain, with a focus on ${interviewDetails.subDomain}.

Here is the transcript of questions, candidate's answers, and AI feedback on those answers:
${qaDetails}

Based on ALL the information above, provide your analysis.
Your response MUST be a single, valid JSON object with the following exact structure and keys:
{
  "overallFeedback": "A detailed, multi-paragraph summary (200-300 words) of the candidate's performance. Highlight specific strengths and clear areas for improvement, referencing examples from the Q&A if possible. Conclude with a general assessment of their suitability.",
  "overallScore": /* A numerical score from 0 to 100 representing the overall performance. Be critical and fair. */,
  "skills": [ /* An array of 5-7 key skill objects relevant to the role. */
    { "name": "Identified Skill 1 (e.g., Problem Solving)", "score": /* Score 0-100 for this skill */ },
    { "name": "Identified Skill 2 (e.g., React Proficiency)", "score": /* Score 0-100 for this skill */ }
  ],
  "themes": [ /* An array of 3-5 major feedback theme objects. */
    {
      "theme": "Theme 1 (e.g., Strong Technical Foundation)",
      "occurrences": /* Estimated number of times theme was apparent */,
      "sentimentScore": /* Number from -1.0 (very negative) to 1.0 (very positive) for this theme */,
      "examples": [ /* 1-2 short, illustrative quote snippets from Q/A/Feedback */ ]
    }
  ],
  "recommendations": [ /* An array of 2-3 concise, actionable recommendation objects. */
    { "type": /* "positive", "negative", or "neutral" */, "text": "Recommendation text (e.g., Proceed to next round with focus on X.)" }
  ]
}

Ensure the JSON is well-formed. Do not include any text outside of this JSON object.
Analyze holistically. For "skills" and "themes", derive them from the entire interaction.
For "overallScore", consider all aspects including individual scores if available, depth of answers, and clarity of communication.
`;
  console.log(
    "Requesting comprehensive analysis with prompt:",
    prompt.substring(0, 200) + "..."
  );
  const rawJsonResponse = await generateTextWithLLM(prompt, true); // Set expectJson to true

  console.log("Gemini Raw JSON Analysis Response:", rawJsonResponse);

  try {
    // Attempt to clean and parse the JSON
    let cleanedJsonText = rawJsonResponse.trim();
    // Remove markdown backticks for JSON block if present
    if (cleanedJsonText.startsWith("```json")) {
      cleanedJsonText = cleanedJsonText.substring(7);
    }
    if (cleanedJsonText.endsWith("```")) {
      cleanedJsonText = cleanedJsonText.substring(
        0,
        cleanedJsonText.length - 3
      );
    }
    // Remove potential leading/trailing non-JSON characters if LLM is inconsistent
    const jsonStart = cleanedJsonText.indexOf("{");
    const jsonEnd = cleanedJsonText.lastIndexOf("}");
    if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
      cleanedJsonText = cleanedJsonText.substring(jsonStart, jsonEnd + 1);
    }

    const analysis: ComprehensiveAnalysisResult = JSON.parse(cleanedJsonText);

    // Basic validation of the parsed structure (can be expanded)
    if (
      !analysis.overallFeedback ||
      typeof analysis.overallScore !== "number" ||
      !Array.isArray(analysis.skills)
    ) {
      console.error(
        "Parsed JSON for comprehensive analysis is missing key fields.",
        analysis
      );
      throw new Error(
        "AI response for comprehensive analysis was not in the expected JSON structure."
      );
    }

    return analysis;
  } catch (error: any) {
    console.error(
      "Failed to parse JSON response from LLM for comprehensive analysis:",
      error
    );
    console.error(
      "LLM Raw Response that caused parsing error:",
      rawJsonResponse
    );
    console.error(
      "Prompt that led to error:",
      prompt.substring(0, 500) + "..."
    ); // Log part of the prompt
    throw new Error(
      `Failed to parse AI analysis: ${error.message}. Ensure the LLM returns valid JSON.`
    );
  }
}

// getOverallInterviewFeedback is now a legacy function if performComprehensiveInterviewAnalysis is used for all overall feedback needs.
// If you still need just the text summary, you can keep it or phase it out.
// For now, let's assume performComprehensiveInterviewAnalysis is the primary one.
// If you call getOverallInterviewFeedback, it will just return the text.
export async function getOverallInterviewFeedback(interviewDetails: {
  domain: string;
  subDomain: string;
  level: string;
  questionsAndAnswers: Array<{
    question: string;
    answer: string;
    feedback?: string | null;
    score?: number | null;
  }>;
}): Promise<string> {
  // Note: This only returns the string feedback, not the full analysis object
  let qaDetails =
    "Summary of questions, answers, and individual feedback given by an AI assistant:\n";
  interviewDetails.questionsAndAnswers.forEach((qa, index) => {
    qaDetails += `\n--- Question ${index + 1} ---\n`;
    qaDetails += `Question Asked: ${qa.question}\n`;
    qaDetails += `Candidate's Answer: ${qa.answer || "No answer provided."}\n`;
    if (qa.feedback) qaDetails += `AI Feedback on Answer: ${qa.feedback}\n`;
    if (qa.score !== null && qa.score !== undefined)
      qaDetails += `Score for Answer: ${qa.score}/100\n`;
  });

  const prompt = `
You are a Senior Technical Hiring Manager. You have just reviewed an interview transcript for a ${interviewDetails.level}-level role in the ${interviewDetails.domain} domain, focused on ${interviewDetails.subDomain}.

INTERVIEW TRANSCRIPT DETAILS:
${qaDetails}

Based on all the information above, provide a concise overall feedback summary for the candidate.
This summary should highlight key strengths, significant areas for improvement, and a general assessment of their suitability for the role based on this interview.
Focus SOLELY on providing the textual summary. Do NOT include a numerical score, skill breakdown, or recommendations in this specific output.
The summary should be well-structured and professional, typically 2-3 paragraphs.
`;
  console.log(
    "Requesting overall feedback text with prompt:",
    prompt.substring(0, 200) + "..."
  );
  return generateTextWithLLM(prompt);
}
