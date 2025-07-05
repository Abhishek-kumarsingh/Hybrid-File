// Question.ts
// src/models/Question.ts
import mongoose, { Schema, Document } from "mongoose";
import { Question as QuestionInterface } from "../types";

export interface IQuestion extends QuestionInterface, Document {
  id: string;
}

const QuestionSchema: Schema = new Schema(
  {
    content: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["text", "multiple-choice", "coding"],
    },
    options: { type: String, nullable: true }, // JSON string for multiple-choice
    correctAnswer: { type: String, nullable: true },
    domain: { type: String, required: true },
    subDomain: { type: String, nullable: true },
    difficulty: {
      type: String,
      required: true,
      enum: ["easy", "intermediate", "advanced"],
    },
    interviewId: {
      type: Schema.Types.ObjectId,
      ref: "Interview",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

QuestionSchema.virtual("id").get(function (this: IQuestion) {
  return (this._id as mongoose.Types.ObjectId).toHexString();
});

export default mongoose.model<IQuestion>("Question", QuestionSchema);
