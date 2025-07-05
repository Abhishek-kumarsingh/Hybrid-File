// src/models/User.ts
import mongoose, { Schema, Document, Types } from "mongoose"; // Import Types
import bcrypt from "bcryptjs";
import { User as UserInterface } from "../types";

export interface IUser extends UserInterface, Document {
  id: string;
  _id: Types.ObjectId; // Explicitly define _id type for clarity and use in virtual
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    // Pass IUser to Schema for better type inference
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    image: { type: String, nullable: true },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "interviewer"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Mongoose's _id is an ObjectId. We want to use 'id' as a string.
UserSchema.virtual("id").get(function (this: IUser) {
  // Explicitly type 'this'
  return this._id.toHexString();
});

// Pre-save hook to hash password
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password for login
UserSchema.methods.comparePassword = async function (
  this: IUser,
  candidatePassword: string
): Promise<boolean> {
  // Explicitly type 'this' here too
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
