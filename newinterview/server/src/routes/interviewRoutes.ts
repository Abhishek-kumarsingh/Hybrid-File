// src/routes/interviewRoutes.ts
import { Router, Request, Response } from "express";
import Interview from "../models/Interview";
import Question from "../models/Question"; // For distinct questions
import Message from "../models/Message";
import { isValidObjectId } from "mongoose";
import {
  generateInterviewQuestions,
  getFeedbackOnAnswer,
  getOverallInterviewFeedback,
  performComprehensiveInterviewAnalysis, // Import new function
} from "../services/geminiService"; // Import the service

const router = Router();

// Helper to check for valid ObjectId
const checkIdValidity = (
  id: string,
  res: Response,
  resourceName: string = "resource"
) => {
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: `Invalid ${resourceName} ID format` });
    return false;
  }
  return true;
};

// GET all interviews (consider pagination for real app)
router.get("/", async (req: Request, res: Response) => {
  try {
    const { status, sort, domain, limit, timeframe } = req.query;
    const queryFilter: any = {};
    const sortOptions: any = {};

    if (status) queryFilter.status = status as string;
    if (domain) queryFilter.domain = domain as string;

    const dateFilter = getDateRangeFilter(timeframe as string | undefined);
    if (Object.keys(dateFilter).length > 0) {
      queryFilter.$and = queryFilter.$and
        ? [...queryFilter.$and, dateFilter]
        : [dateFilter];
    }

    if (sort) {
      const sortField = (sort as string).startsWith("-")
        ? (sort as string).substring(1)
        : (sort as string);
      const sortOrder = (sort as string).startsWith("-") ? -1 : 1;
      sortOptions[sortField] = sortOrder;
    } else {
      sortOptions.createdAt = -1; // Default sort
    }

    let query = Interview.find(queryFilter)
      .populate("userId", "name email role")
      .populate("candidateId", "name email role avatarUrl") // Ensure avatarUrl is populated
      .sort(sortOptions);

    if (limit && !isNaN(parseInt(limit as string))) {
      query = query.limit(parseInt(limit as string));
    }

    const interviews = await query.exec();
    res.json(interviews);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching interviews", error: error.message });
  }
});

// GET interview by ID
router.get("/:id", async (req: Request, res: Response) => {
  if (!checkIdValidity(req.params.id, res, "interview")) return;
  try {
    const interview = await Interview.findById(req.params.id)
      .populate("userId", "name email role")
      .populate("candidateId", "name email");

    if (interview) {
      // Optionally, fetch linked Question documents if it's not an AI interview with embedded questions
      // For simplicity, we'll let the client fetch them via /:interviewId/questions if needed
      res.json(interview);
    } else {
      res.status(404).json({ message: "Interview not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching interview", error: error.message });
  }
});

// GET interviews by User ID
router.get("/user/:userId", async (req: Request, res: Response) => {
  if (!checkIdValidity(req.params.userId, res, "user")) return;
  try {
    const interviews = await Interview.find({
      userId: req.params.userId,
    }).populate("candidateId", "name email");
    res.json(interviews);
  } catch (error: any) {
    res.status(500).json({
      message: "Error fetching interviews for user",
      error: error.message,
    });
  }
});

// POST create new interview
router.post("/", async (req: Request, res: Response) => {
  try {
    const { userId, domain, subDomain, level, type, candidateId } = req.body;
    if (!userId || !domain || !subDomain || !level || !type) {
      return res.status(400).json({
        message:
          "Missing required fields: userId, domain, subDomain, level, type",
      });
    }
    console.log(userId, domain, subDomain, level, type);

    if (candidateId && !isValidObjectId(candidateId)) {
      return res.status(400).json({ message: "Invalid candidateId format" });
    }
    if (userId && !isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const newInterview = new Interview(req.body);
    await newInterview.save();
    res.status(201).json(newInterview);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error creating interview", error: error.message });
  }
});

// PUT update interview
router.put("/:id", async (req: Request, res: Response) => {
  if (!checkIdValidity(req.params.id, res, "interview")) return;
  try {
    const { candidateId, userId, ...updateData } = req.body; // Prevent changing userId and candidateId easily this way

    if (candidateId && !isValidObjectId(candidateId)) {
      return res.status(400).json({ message: "Invalid candidateId format" });
    }
    if (userId && !isValidObjectId(userId)) {
      // if provided, check validity
      return res.status(400).json({ message: "Invalid userId format" });
    }
    if (candidateId) updateData.candidateId = candidateId; // Allow updating if valid

    const updatedInterview = await Interview.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (updatedInterview) {
      res.json(updatedInterview);
    } else {
      res.status(404).json({ message: "Interview not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error updating interview", error: error.message });
  }
});

// DELETE interview
router.delete("/:id", async (req: Request, res: Response) => {
  if (!checkIdValidity(req.params.id, res, "interview")) return;
  try {
    const deletedInterview = await Interview.findByIdAndDelete(req.params.id);
    if (deletedInterview) {
      // Also delete related questions and messages
      await Question.deleteMany({ interviewId: req.params.id });
      await Message.deleteMany({ interviewId: req.params.id });
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Interview not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error deleting interview", error: error.message });
  }
});

// --- Nested routes for questions and messages related to an interview ---

// GET questions for a specific interview (these are distinct Question documents)
router.get("/:interviewId/questions", async (req: Request, res: Response) => {
  if (!checkIdValidity(req.params.interviewId, res, "interview")) return;
  try {
    const interview = await Interview.findById(req.params.interviewId);
    if (!interview)
      return res
        .status(404)
        .json({ message: "Interview not found for these questions" });

    const questions = await Question.find({
      interviewId: req.params.interviewId,
    });
    res.json(questions);
  } catch (error: any) {
    res.status(500).json({
      message: "Error fetching questions for interview",
      error: error.message,
    });
  }
});

// POST a new question (distinct Question document) to a specific interview
router.post("/:interviewId/questions", async (req: Request, res: Response) => {
  if (!checkIdValidity(req.params.interviewId, res, "interview")) return;
  try {
    const interview = await Interview.findById(req.params.interviewId);
    if (!interview)
      return res
        .status(404)
        .json({ message: "Interview not found to add question to" });
    if (
      interview.type === "ai_generated" &&
      interview.questions &&
      interview.questions.length > 0
    ) {
      return res.status(400).json({
        message:
          "Cannot add distinct questions to an AI interview that already has embedded questions. Update the interview itself.",
      });
    }

    const { content, type, domain, difficulty } = req.body;
    if (!content || !type || !domain || !difficulty) {
      return res
        .status(400)
        .json({ message: "Missing required fields for question" });
    }
    const newQuestion = new Question({
      ...req.body,
      interviewId: req.params.interviewId,
    });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error: any) {
    res.status(500).json({
      message: "Error creating question for interview",
      error: error.message,
    });
  }
});

// GET messages for a specific interview
router.get("/:interviewId/messages", async (req: Request, res: Response) => {
  if (!checkIdValidity(req.params.interviewId, res, "interview")) return;
  try {
    const interview = await Interview.findById(req.params.interviewId);
    if (!interview)
      return res
        .status(404)
        .json({ message: "Interview not found for these messages" });

    const messages = await Message.find({
      interviewId: req.params.interviewId,
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error: any) {
    res.status(500).json({
      message: "Error fetching messages for interview",
      error: error.message,
    });
  }
});

// POST a new message to a specific interview
router.post("/:interviewId/messages", async (req: Request, res: Response) => {
  if (!checkIdValidity(req.params.interviewId, res, "interview")) return;
  try {
    const interview = await Interview.findById(req.params.interviewId);
    if (!interview)
      return res
        .status(404)
        .json({ message: "Interview not found to add message to" });

    const { content, role } = req.body;
    if (!content || !role) {
      return res.status(400).json({
        message: "Missing required fields for message: content, role",
      });
    }
    const newMessage = new Message({
      ...req.body,
      interviewId: req.params.interviewId,
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error: any) {
    res.status(500).json({
      message: "Error creating message for interview",
      error: error.message,
    });
  }
});

router.post(
  "/:id/ai-answer/:questionIndex",
  async (req: Request, res: Response) => {
    const interviewId = req.params.id;
    const questionIndex = parseInt(req.params.questionIndex, 10);
    const { answer } = req.body; // Candidate's answer from the request body

    if (!checkIdValidity(interviewId, res, "interview")) return;

    if (isNaN(questionIndex) || questionIndex < 0) {
      return res.status(400).json({ message: "Invalid question index." });
    }

    if (answer === undefined || answer === null) {
      // Allow empty string, but not undefined/null
      return res
        .status(400)
        .json({ message: "Answer content is required in the request body." });
    }

    try {
      const interview = await Interview.findById(interviewId);

      if (!interview) {
        return res.status(404).json({ message: "Interview not found." });
      }

      if (interview.type !== "ai_generated") {
        return res.status(400).json({
          message:
            "This endpoint is only for submitting answers to AI-generated interviews.",
        });
      }

      if (!interview.questions || interview.questions.length === 0) {
        return res.status(400).json({
          message:
            "This AI interview has no questions. Please set up questions first.",
        });
      }

      if (questionIndex >= interview.questions.length) {
        return res
          .status(404)
          .json({ message: "Question index out of bounds." });
      }

      // Access the specific question sub-document
      const questionToUpdate = interview.questions[questionIndex];

      // Update the candidate's answer
      questionToUpdate.answer = answer;

      // Get AI feedback for this specific answer
      // Ensure getFeedbackOnAnswer returns { feedback: string, score?: number }
      console.log(
        `Requesting AI feedback for Q: "${questionToUpdate.question}", A: "${answer}"`
      );
      const feedbackResult = await getFeedbackOnAnswer(
        questionToUpdate.question,
        answer,
        interview.domain,
        interview.subDomain || "", // Pass subDomain, ensure it's not undefined
        interview.level || "" // Pass level, ensure it's not undefined
      );
      console.log("AI Feedback received:", feedbackResult);

      // Update feedback and score on the sub-document
      questionToUpdate.feedback = feedbackResult.feedback;
      if (typeof feedbackResult.score === "number") {
        questionToUpdate.score = feedbackResult.score;
      } else {
        questionToUpdate.score = null; // Explicitly set to null if no score
      }

      // Mark the questions array as modified if Mongoose struggles with deep array updates
      // Mongoose typically detects changes in subdocuments, but this can be a failsafe.
      // interview.markModified('questions');

      const updatedInterview = await interview.save(); // Save the entire interview document

      console.log(
        `Answer for Q${questionIndex} in interview ${interviewId} updated with feedback.`
      );

      // CRUCIAL: Respond with the entire updated interview object.
      // Your frontend's `ConductInterviewPage` and `api-utils.ts` (for `submitAiAnswer`)
      // expect the updated interview to be returned directly.
      res.status(200).json(updatedInterview);
      // If you were to wrap it like other responses:
      // res.status(200).json({
      //   message: "Answer submitted and feedback generated successfully.",
      //   interview: updatedInterview, // The updated interview document
      //   // You could also just return the specific updated question if frontend only needs that
      //   // updatedQuestion: updatedInterview.questions[questionIndex]
      // });
    } catch (error: any) {
      console.error(
        `Error in /:id/ai-answer/:questionIndex route for interview ${interviewId}:`,
        error
      );
      res.status(500).json({
        message: "Failed to submit answer or generate feedback.",
        error: error.message,
      });
    }
  }
);

// // --- Endpoint to GENERATE AI Questions for an Interview --- in which new gets appended
// router.post(
//   "/:id/generate-ai-questions",
//   async (req: Request, res: Response) => {
//     if (!checkIdValidity(req.params.id, res, "interview")) return;

//     const { numQuestions = 5 } = req.body; // Default to 5 questions

//     try {
//       const interview = await Interview.findById(req.params.id);
//       if (!interview) {
//         return res.status(404).json({ message: "Interview not found" });
//       }

//       if (interview.type !== "ai_generated") {
//         return res.status(400).json({
//           message: "This endpoint is only for AI-generated interview types.",
//         });
//       }

//       // Get existing embedded questions to avoid too much repetition if re-generating
//       const existingQuestionTexts = interview.questions.map((q) => q.question);

//       const generatedQuestions = await generateInterviewQuestions(
//         interview.domain,
//         interview.subDomain,
//         interview.level,
//         numQuestions,
//         existingQuestionTexts
//       );

//       // Add new questions, or replace if you prefer
//       // This example appends to existing AI questions if any, or sets them if none.
//       const newAiQuestions = generatedQuestions.map((gq) => ({
//         question: gq.question,
//         answer: "", // Initialize empty answer and feedback
//         feedback: "",
//       }));

//       interview.questions = [...interview.questions, ...newAiQuestions];
//       interview.status = "in_progress"; // Or 'pending_candidate_response'
//       await interview.save();

//       res.json({
//         message: "AI questions generated and added to interview.",
//         interview,
//       });
//     } catch (error: any) {
//       console.error("Error in /:id/generate-ai-questions route:", error);
//       res.status(500).json({
//         message: "Failed to generate AI questions",
//         error: error.message,
//       });
//     }
//   }
// );

// --- Endpoint to GENERATE AI Questions for an Interview --- with previous ones gets deleted
router.post(
  "/:id/generate-ai-questions",
  async (req: Request, res: Response) => {
    if (!checkIdValidity(req.params.id, res, "interview")) return;

    const { numQuestions = 5 } = req.body; // Default to 5 questions

    try {
      const interview = await Interview.findById(req.params.id);
      if (!interview) {
        return res.status(404).json({ message: "Interview not found" });
      }

      if (interview.type !== "ai_generated") {
        return res.status(400).json({
          message: "This endpoint is only for AI-generated interview types.",
        });
      }

      // Get existing embedded questions to avoid too much repetition if re-generating
      const existingQuestionTexts = interview.questions.map((q) => q.question);

      const generatedQuestions = await generateInterviewQuestions(
        interview.domain,
        interview.subDomain,
        interview.level,
        numQuestions,
        existingQuestionTexts
      );

      // Prepare the new AI-generated questions
      const newAiQuestions = generatedQuestions.map((gq) => ({
        question: gq.question,
        answer: "", // Initialize empty answer and feedback
        feedback: "",
      }));

      // Option 1: Replace all existing questions with the new ones
      interview.questions = newAiQuestions;

      // Option 2: Clear answers and feedback of existing questions before appending
      // const updatedQuestions = interview.questions.map((q) => ({
      //   ...q,
      //   answer: "",  // Clear existing answer
      //   feedback: "", // Clear existing feedback
      // }));
      // interview.questions = [...updatedQuestions, ...newAiQuestions];

      interview.status = "in_progress"; // Or 'pending_candidate_response'
      await interview.save();

      res.json({
        message: "AI questions generated and added to interview.",
        interview,
      });
    } catch (error: any) {
      console.error("Error in /:id/generate-ai-questions route:", error);
      res.status(500).json({
        message: "Failed to generate AI questions",
        error: error.message,
      });
    }
  }
);

// --- Endpoint to SUBMIT an ANSWER and GET AI FEEDBACK for a specific question in an AI Interview ---
// AI interviews have questions embedded. We'll use an index for the question.
router.post(
  "/:id/questions/:questionIndex/submit-answer",
  async (req: Request, res: Response) => {
    if (!checkIdValidity(req.params.id, res, "interview")) return;

    const questionIndex = parseInt(req.params.questionIndex, 10);
    const { answer } = req.body;

    if (isNaN(questionIndex) || questionIndex < 0) {
      return res.status(400).json({ message: "Invalid question index." });
    }
    if (answer === undefined) {
      // Allow empty string for answer, but not undefined
      return res
        .status(400)
        .json({ message: "Answer is required in the request body." });
    }

    try {
      const interview = await Interview.findById(req.params.id);
      if (!interview) {
        return res.status(404).json({ message: "Interview not found." });
      }
      if (
        interview.type !== "ai_generated" ||
        !interview.questions ||
        interview.questions.length === 0
      ) {
        return res.status(400).json({
          message: "This interview is not an AI interview or has no questions.",
        });
      }
      if (questionIndex >= interview.questions.length) {
        return res
          .status(404)
          .json({ message: "Question index out of bounds." });
      }

      const questionToUpdate = interview.questions[questionIndex];
      questionToUpdate.answer = answer; // Store the candidate's answer

      // Get feedback from Gemini
      const feedbackResult = await getFeedbackOnAnswer(
        questionToUpdate.question,
        answer,
        interview.domain,
        interview.subDomain,
        interview.level
      );

      questionToUpdate.feedback = feedbackResult.feedback;
      // interview.questions[questionIndex] is already a reference, so it's updated.

      await interview.save();

      res.json({
        message: "Answer submitted and feedback generated.",
        question: questionToUpdate.question,
        answer: questionToUpdate.answer,
        feedback: questionToUpdate.feedback,
        score: feedbackResult.score, // Send AI's suggested score for this question
      });
    } catch (error: any) {
      console.error(
        "Error in /:id/questions/:questionIndex/submit-answer route:",
        error
      );
      res.status(500).json({
        message: "Failed to submit answer or get feedback",
        error: error.message,
      });
    }
  }
);

// --- Endpoint to FINALIZE AI Interview and GET OVERALL FEEDBACK & SCORE ---
// router.post(
//   "/:id/finalize-ai-interview",
//   async (req: Request, res: Response) => {
//     if (!checkIdValidity(req.params.id, res, "interview")) return;

//     try {
//       const interview = await Interview.findById(req.params.id);
//       if (!interview) {
//         return res.status(404).json({ message: "Interview not found." });
//       }
//       if (interview.type !== "ai_generated") {
//         return res.status(400).json({
//           message: "This endpoint is only for AI-generated interview types.",
//         });
//       }
//       if (interview.status === "completed") {
//         return res
//           .status(400)
//           .json({ message: "Interview is already completed." });
//       }

//       // Ensure all (or most) questions have answers/feedback if desired, or proceed anyway
//       const questionsAndAnswers = interview.questions.map((q) => ({
//         question: q.question,
//         answer: q.answer,
//         feedback: q.feedback,
//         // score: we'll calculate overall score after getting individual scores during feedback phase
//       }));

//       // Generate overall feedback using Gemini
//       const overallFeedbackText = await getOverallInterviewFeedback({
//         domain: interview.domain,
//         subDomain: interview.subDomain,
//         level: interview.level,
//         questionsAndAnswers: questionsAndAnswers.map((qa) => ({
//           question: qa.question,
//           answer: qa.answer,
//           feedback: qa.feedback,
//           // If you stored individual AI scores, pass them here.
//           // For now, this prompt doesn't use individual scores, but you could adapt it.
//         })),
//       });

//       interview.overallFeedback = overallFeedbackText;

//       // Calculate an overall score (example: average of individual question scores if you had them)
//       // For now, let's simulate or leave it to a manual review after AI feedback
//       // Or, you could try to have the AI suggest an overall score in a separate call.
//       // This example just marks it complete. A real scoring might be more complex.
//       let totalScore = 0;
//       let scoredQuestions = 0;
//       for (const q of interview.questions) {
//         // This assumes you ran getFeedbackOnAnswer for each question and got a score
//         // If not, this part needs adjustment or a different scoring logic
//         // For this example, let's assume the score might have been stored in a 'score' field within the embedded question
//         // If your getFeedbackOnAnswer stores a score directly on the question object in DB, you'd use that.
//         // Let's say you have a `q.score` field populated earlier.
//         // if (typeof q.score === 'number') {
//         //    totalScore += q.score;
//         //    scoredQuestions++;
//         // }
//       }
//       // interview.score = scoredQuestions > 0 ? Math.round(totalScore / scoredQuestions) : null;
//       // For now, we're not calculating an automated overall score from Gemini in this step.
//       // The `getOverallInterviewFeedback` focuses on textual summary.
//       // You could add another Gemini call to get a numerical score based on the summary if needed.

//       interview.status = "completed";
//       await interview.save();

//       res.json({
//         message: "AI Interview finalized. Overall feedback generated.",
//         interview,
//       });
//     } catch (error: any) {
//       console.error("Error in /:id/finalize-ai-interview route:", error);
//       res.status(500).json({
//         message: "Failed to finalize AI interview",
//         error: error.message,
//       });
//     }
//   }
// );

// --- Endpoint to MARK an AI Interview as COMPLETED (Finalize Status) ---
// This is called when the candidate finishes submitting all answers.
// It now ALSO triggers the initial comprehensive analysis.
router.post(
  "/:id/finalize-ai-interview", // Changed from /finalize-ai-interview to match api-utils.ts
  async (req: Request, res: Response) => {
    if (!checkIdValidity(req.params.id, res, "interview")) return;

    try {
      const interview = await Interview.findById(req.params.id).populate(
        "candidateId",
        "name email"
      ); // Populate candidate if needed by analysis context

      if (!interview) {
        return res.status(404).json({ message: "Interview not found." });
      }
      if (interview.type !== "ai_generated") {
        return res.status(400).json({
          message:
            "This finalization endpoint is primarily for AI-generated interviews that require analysis.",
        });
      }

      // Prevent re-finalizing if already fully completed with analysis,
      // unless explicitly allowed (e.g., via a force flag, not implemented here).
      // A simple 'completed' status check might not be enough if analysis can be separate.
      if (
        interview.status === "completed" &&
        interview.overallFeedback &&
        interview.analyzedSkills &&
        interview.analyzedSkills.length > 0
      ) {
        console.log(
          `Interview ${interview.id} is already completed with analysis. To re-analyze, use the regenerate endpoint.`
        );
        // Return the existing fully analyzed interview
        return res.status(200).json(interview);
      }

      // Prepare data for Gemini comprehensive analysis
      const analysisInput = {
        domain: interview.domain,
        subDomain: interview.subDomain || "",
        level: interview.level || "",
        // Potentially add candidate name/role to the prompt context if available and useful
        // candidateName: interview.candidateId ? (interview.candidateId as any).name : 'the candidate',
        questionsAndAnswers: interview.questions.map((q) => ({
          question: q.question,
          answer: q.answer,
          feedback: q.feedback, // Feedback from individual AI answers
          score: q.score,
        })),
      };

      console.log(
        `Performing comprehensive analysis for interview: ${interview.id}`
      );
      const analysisResult = await performComprehensiveInterviewAnalysis(
        analysisInput
      );
      console.log(
        `Comprehensive analysis received for interview: ${interview.id}`
      );

      // Update the interview document with all analyzed data
      interview.overallFeedback = analysisResult.overallFeedback;
      interview.score = analysisResult.overallScore;
      interview.set("analyzedSkills", analysisResult.skills); // Assign array directly using set to avoid schema type issues
      interview.set("analyzedFeedbackThemes", analysisResult.themes);
      interview.set("analyzedRecommendations", analysisResult.recommendations);
      interview.status = "completed"; // Mark as completed

      const updatedInterview = await interview.save();

      console.log(`Interview ${interview.id} finalized and analysis saved.`);
      // Return the full updated interview with all analysis fields populated
      res.status(200).json(updatedInterview);
    } catch (error: any) {
      console.error("Error in /:id/finalize route:", error);
      res.status(500).json({
        message: "Failed to finalize interview and generate analysis",
        error: error.message,
      });
    }
  }
);

// --- Endpoint to REGENERATE OVERALL FEEDBACK & ANALYSIS for an AI Interview ---
// This is called from the "Interview Analysis Page" if the user wants to re-run the full analysis.
router.post(
  "/:id/generate-overall-feedback", // This matches your api-utils.ts generateFeedback
  async (req: Request, res: Response) => {
    if (!checkIdValidity(req.params.id, res, "interview")) return;

    try {
      const interview = await Interview.findById(req.params.id).populate(
        "candidateId",
        "name email"
      );
      if (!interview) {
        return res.status(404).json({ message: "Interview not found." });
      }
      if (interview.type !== "ai_generated") {
        return res.status(400).json({
          message: "Analysis regeneration is for AI-generated interviews.",
        });
      }

      // Prepare data for Gemini comprehensive analysis (same as in /finalize)
      const analysisInput = {
        domain: interview.domain,
        subDomain: interview.subDomain || "",
        level: interview.level || "",
        questionsAndAnswers: interview.questions.map((q) => ({
          question: q.question,
          answer: q.answer,
          feedback: q.feedback,
          score: q.score,
        })),
      };

      console.log(
        `Regenerating comprehensive analysis for interview: ${interview.id}`
      );
      const analysisResult = await performComprehensiveInterviewAnalysis(
        analysisInput
      );
      console.log(
        `Regenerated comprehensive analysis received for interview: ${interview.id}`
      );

      // Update the interview document with all re-analyzed data
      interview.overallFeedback = analysisResult.overallFeedback;
      interview.score = analysisResult.overallScore;
      interview.set("analyzedSkills", analysisResult.skills); // Assign array directly using set to avoid schema type issues
      interview.set("analyzedFeedbackThemes", analysisResult.themes);
      interview.set("analyzedRecommendations", analysisResult.recommendations);
      // Status should already be 'completed', but ensure it if somehow it wasn't
      if (interview.status !== "completed") {
        interview.status = "completed";
      }

      const updatedInterviewWithNewAnalysis = await interview.save();

      console.log(
        `Analysis for interview ${interview.id} regenerated and saved.`
      );
      // Crucial: Return the *entire updated interview object* because the frontend
      // `interviewApi.generateFeedback` expects this to update its state.
      res.status(200).json(updatedInterviewWithNewAnalysis);
    } catch (error: any) {
      console.error("Error in /:id/generate-overall-feedback route:", error);
      res.status(500).json({
        message: "Failed to regenerate overall feedback and analysis",
        error: error.message,
      });
    }
  }
);
// ... (rest of your existing interviewRoutes.ts, like GET, PUT, DELETE etc.) ...
// Make sure to add the new POST routes before any generic /:id routes if there's a conflict pattern.

export default router;

function getDateRangeFilter(timeframe: string | undefined) {
  if (!timeframe) return {};

  const now = new Date();
  let startDate: Date | undefined;

  switch (timeframe) {
    case "last_7_days":
      startDate = new Date();
      startDate.setDate(now.getDate() - 7);
      break;
    case "last_30_days":
      startDate = new Date();
      startDate.setDate(now.getDate() - 30);
      break;
    case "last_90_days":
      startDate = new Date();
      startDate.setDate(now.getDate() - 90);
      break;
    case "this_month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "this_year":
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      return {}; // Return an empty filter if the timeframe is invalid
  }

  return startDate ? { createdAt: { $gte: startDate, $lte: now } } : {};
}
