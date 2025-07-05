// questionRoutes.ts
// src/routes/questionRoutes.ts
import { Router, Request, Response } from "express";
import Question from "../models/Question";
import Interview from "../models/Interview"; // To verify interviewId if creating/updating
import { isValidObjectId } from "mongoose";

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

// GET all questions (globally - consider if this is needed, could be very large)
// It's usually better to get questions per interview.
router.get("/", async (req: Request, res: Response) => {
  try {
    // Add query parameters for filtering if needed (e.g., by domain, difficulty)
    const { domain, difficulty, subDomain } = req.query;
    const filter: any = {};
    if (domain) filter.domain = domain;
    if (difficulty) filter.difficulty = difficulty;
    if (subDomain) filter.subDomain = subDomain;

    const questions = await Question.find(filter).populate(
      "interviewId",
      "title type"
    );
    res.json(questions);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching questions", error: error.message });
  }
});

// GET a specific question by its ID
router.get("/:id", async (req: Request, res: Response) => {
  if (!checkIdValidity(req.params.id, res, "question")) return;
  try {
    const question = await Question.findById(req.params.id).populate(
      "interviewId",
      "title type"
    );
    if (question) {
      res.json(question);
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching question", error: error.message });
  }
});

// POST create a new standalone question (less common - usually created via interview route)
// This route would imply creating a question that might be associated with an interview later,
// or is part of a general bank and then assigned.
router.post("/", async (req: Request, res: Response) => {
  try {
    const { content, type, domain, difficulty, interviewId } = req.body;
    if (!content || !type || !domain || !difficulty || !interviewId) {
      // interviewId is crucial
      return res
        .status(400)
        .json({
          message:
            "Missing required fields: content, type, domain, difficulty, interviewId",
        });
    }
    if (!checkIdValidity(interviewId, res, "interview")) return;

    const interviewExists = await Interview.findById(interviewId);
    if (!interviewExists) {
      return res
        .status(404)
        .json({ message: `Interview with ID ${interviewId} not found.` });
    }
    // Ensure this interview is not an 'ai_generated' type with embedded questions
    if (
      interviewExists.type === "ai_generated" &&
      interviewExists.questions &&
      interviewExists.questions.length > 0
    ) {
      return res
        .status(400)
        .json({
          message:
            "Cannot add distinct questions to an AI interview that already has embedded questions.",
        });
    }

    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error creating question", error: error.message });
  }
});

// PUT update a specific question by its ID
router.put("/:id", async (req: Request, res: Response) => {
  if (!checkIdValidity(req.params.id, res, "question")) return;
  try {
    // interviewId should generally not be changed. If it needs to be, handle carefully.
    const { interviewId, ...updateData } = req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (updatedQuestion) {
      res.json(updatedQuestion);
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error updating question", error: error.message });
  }
});

// DELETE a specific question by its ID
router.delete("/:id", async (req: Request, res: Response) => {
  if (!checkIdValidity(req.params.id, res, "question")) return;
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    if (deletedQuestion) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error deleting question", error: error.message });
  }
});

export default router;
