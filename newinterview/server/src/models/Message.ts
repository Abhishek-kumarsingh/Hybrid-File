// src/models/Message.ts
import mongoose, { Schema, Document } from "mongoose";
import { Message as MessageInterface } from "../types";

export interface IMessage extends MessageInterface, Document {
  id: string;
}

const MessageSchema: Schema = new Schema(
  {
    content: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["user", "assistant", "system"],
    }, // 'user' is candidate, 'assistant' is AI/interviewer
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

MessageSchema.virtual("id").get(function (this: IMessage) {
  return (this._id as mongoose.Types.ObjectId).toHexString();
});

export default mongoose.model<IMessage>("Message", MessageSchema);
