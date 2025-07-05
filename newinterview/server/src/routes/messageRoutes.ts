// messageRoutes.ts
// src/routes/messageRoutes.ts
import { Router, Request, Response } from "express";
import Message from "../models/Message";
import Interview from "../models/Interview"; // To verify interviewId if creating
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

// GET all messages (globally - usually not recommended due to volume. Prefer per-interview)
router.get("/", async (req: Request, res: Response) => {
  try {
    // Consider adding filters, e.g., by role or date range
    const messages = await Message.find().populate("interviewId", "title type");
    res.json(messages);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching messages", error: error.message });
  }
});

// GET a specific message by its ID
router.get("/:id", async (req: Request, res: Response) => {
  if (!checkIdValidity(req.params.id, res, "message")) return;
  try {
    const message = await Message.findById(req.params.id).populate(
      "interviewId",
      "title type"
    );
    if (message) {
      res.json(message);
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching message", error: error.message });
  }
});

// POST create a new standalone message (less common - usually created via interview route)
router.post("/", async (req: Request, res: Response) => {
  try {
    const { content, role, interviewId } = req.body;
    if (!content || !role || !interviewId) {
      return res
        .status(400)
        .json({
          message: "Missing required fields: content, role, interviewId",
        });
    }
    if (!checkIdValidity(interviewId, res, "interview")) return;

    const interviewExists = await Interview.findById(interviewId);
    if (!interviewExists) {
      return res
        .status(404)
        .json({ message: `Interview with ID ${interviewId} not found.` });
    }

    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error creating message", error: error.message });
  }
});

// PUT update a specific message by its ID (usually messages are immutable, but if needed)
router.put("/:id", async (req: Request, res: Response) => {
  if (!checkIdValidity(req.params.id, res, "message")) return;
  try {
    // Only allow updating content, for example. Role and interviewId should not change.
    const { content } = req.body;
    if (content === undefined) {
      return res
        .status(400)
        .json({ message: "Content is required for update." });
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    if (updatedMessage) {
      res.json(updatedMessage);
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error updating message", error: error.message });
  }
});

// DELETE a specific message by its ID
router.delete("/:id", async (req: Request, res: Response) => {
  if (!checkIdValidity(req.params.id, res, "message")) return;
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    if (deletedMessage) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error deleting message", error: error.message });
  }
});

export default router;
