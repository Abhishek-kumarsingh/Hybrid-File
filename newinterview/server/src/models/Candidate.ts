// Candidate.ts
// src/models/Candidate.ts
import mongoose, { Schema, Document } from "mongoose";
import { Candidate as CandidateInterface } from "../types";

export interface ICandidate extends CandidateInterface, Document {
  id: string;
}

const CandidateSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, nullable: true },
    role: { type: String, nullable: true }, // Role they are applying for
    department: { type: String, nullable: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // The user who created/owns this candidate record
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CandidateSchema.virtual("id").get(function (this: ICandidate) {
  return (this._id as mongoose.Types.ObjectId).toHexString();
});

export default mongoose.model<ICandidate>("Candidate", CandidateSchema);
