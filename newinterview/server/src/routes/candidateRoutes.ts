// candidateRoutes.ts
// src/routes/candidateRoutes.ts
import { Router, Request, Response } from "express";
import Candidate from "../models/Candidate";
import User from "../models/User"; // To validate userId exists
import Interview from "../models/Interview"; // To update interviews if candidate is deleted
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

// GET all candidates
router.get("/", async (req: Request, res: Response) => {
  try {
    const candidates = await Candidate.find().populate("userId", "name email"); // Populate creator info
    res.json(candidates);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching candidates", error: error.message });
  }
});

// GET candidate by ID
router.get("/:id", async (req: Request, res: Response) => {
  if (!checkIdValidity(req.params.id, res, "candidate")) return;
  try {
    const candidate = await Candidate.findById(req.params.id).populate(
      "userId",
      "name email"
    );
    if (candidate) {
      res.json(candidate);
    } else {
      res.status(404).json({ message: "Candidate not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching candidate", error: error.message });
  }
});

// POST create new candidate
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, userId } = req.body;
    if (!name || !email || !userId) {
      return res
        .status(400)
        .json({ message: "Missing required fields: name, email, userId" });
    }
    if (!checkIdValidity(userId, res, "user (creator)")) return;

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User (creator) not found" });
    }

    const existingCandidate = await Candidate.findOne({ email });
    if (existingCandidate) {
      return res
        .status(409)
        .json({ message: "Candidate with this email already exists" });
    }

    const newCandidate = new Candidate(req.body);
    await newCandidate.save();
    res.status(201).json(newCandidate);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error creating candidate", error: error.message });
  }
});

// PUT update candidate
router.put("/:id", async (req: Request, res: Response) => {
  if (!checkIdValidity(req.params.id, res, "candidate")) return;
  try {
    const { userId, email, ...updateData } = req.body; // Prevent changing userId and email easily this way

    // If email needs to be updatable, add specific logic to check for uniqueness
    // if (email) {
    //   const existingCandidate = await Candidate.findOne({ email, _id: { $ne: req.params.id } });
    //   if (existingCandidate) {
    //     return res.status(409).json({ message: 'Another candidate with this email already exists' });
    //   }
    //   updateData.email = email;
    // }

    const updatedCandidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (updatedCandidate) {
      res.json(updatedCandidate);
    } else {
      res.status(404).json({ message: "Candidate not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error updating candidate", error: error.message });
  }
});

// DELETE candidate
router.delete("/:id", async (req: Request, res: Response) => {
  if (!checkIdValidity(req.params.id, res, "candidate")) return;
  try {
    const deletedCandidate = await Candidate.findByIdAndDelete(req.params.id);
    if (deletedCandidate) {
      // Optional: Handle related interviews (e.g., set candidateId to null)
      await Interview.updateMany(
        { candidateId: req.params.id },
        { $set: { candidateId: null } }
      );
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Candidate not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error deleting candidate", error: error.message });
  }
});

export default router;
