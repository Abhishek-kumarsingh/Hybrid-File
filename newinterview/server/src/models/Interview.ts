// Interview.ts
// src/models/Interview.ts
import mongoose, { Schema, Document } from "mongoose";
import { Interview as InterviewInterface } from "../types";

export interface IInterview extends InterviewInterface, Document {
  id: string;
}

const SkillAnalysisSchema = new Schema(
  {
    name: { type: String, required: true },
    score: { type: Number, required: true },
    // Optional: related quotes/examples from feedback
    // examples: [String]
  },
  { _id: false }
);

const FeedbackThemeSchema = new Schema(
  {
    theme: { type: String, required: true },
    occurrences: { type: Number, default: 0 },
    sentimentScore: { type: Number, default: 0 }, // e.g., -1 to 1, or 0-100
    examples: [{ type: String }], // Snippets from feedback illustrating the theme
  },
  { _id: false }
);

const RecommendationSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["positive", "negative", "neutral"],
      required: true,
    },
    text: { type: String, required: true },
  },
  { _id: false }
);

const AIQuestionSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, default: "" },
    feedback: { type: String, default: "" },
    score: { type: Number, default: 0 },
  },
  { _id: false }
);

const InterviewSchema: Schema = new Schema(
  {
    domain: { type: String, required: true },
    subDomain: { type: String, required: true },
    level: { type: String, required: true }, // e.g., 'junior', 'intermediate', 'senior'
    status: {
      type: String,
      required: true,
      enum: [
        "scheduled",
        "pending_ai_generation",
        "in_progress",
        "completed",
        "cancelled",
      ],
      default: "scheduled",
    },
    score: { type: Number, nullable: true },
    overallFeedback: { type: String, nullable: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Interviewer or creator

    // For AI-generated interviews, questions might be embedded
    questions: [AIQuestionSchema],
    analyzedSkills: [SkillAnalysisSchema],
    analyzedFeedbackThemes: [FeedbackThemeSchema],
    analyzedRecommendations: [RecommendationSchema],
    // For manually scheduled interviews
    title: { type: String, nullable: true },
    description: { type: String, nullable: true },
    date: { type: Date, nullable: true },
    duration: { type: Number, nullable: true }, // in minutes
    type: {
      type: String,
      required: true,
      enum: ["technical", "behavioral", "ai_generated", "mixed"],
      default: "technical",
    },
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: "Candidate",
      nullable: true,
    },
    // Note: Other questions (non-AI, distinct Question documents) will be linked via Question.interviewId
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

InterviewSchema.virtual("id").get(function (this: IInterview) {
  return (this._id as mongoose.Types.ObjectId).toHexString();
});

export default mongoose.model<IInterview>("Interview", InterviewSchema);
