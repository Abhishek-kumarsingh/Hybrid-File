// types.ts
// src/types.ts
// These are the base interfaces, Mongoose documents will extend them

import mongoose from "mongoose";

export interface User {
  id?: string; // id will be string version of _id from MongoDB
  name: string;
  email: string;
  password: string; // This will be hashed in the DB
  image?: string | null;
  role?: string; // 'user', 'admin', 'interviewer'
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Interview {
  id?: string;
  domain: string;
  subDomain: string;
  level: string;
  status: string; // 'scheduled', 'in_progress', 'completed', 'cancelled', 'pending_ai_generation'
  score?: number | null;
  overallFeedback?: string | null;
  userId: string; // ObjectId string of the User (interviewer/creator)
  analyzedSkills: {
    length: number;
    type: [mongoose.Schema.Types.Mixed];
    default: [];
  };
  analyzedRecommendations: { type: [mongoose.Schema.Types.Mixed]; default: [] };
  analyzedFeedbackThemes: { type: [mongoose.Schema.Types.Mixed]; default: [] };

  // For AI-generated interviews, questions are embedded
  questions: Array<{
    question: string;
    answer: string;
    feedback: string;
    score?: number | null;
  }>;

  // For manually scheduled interviews
  title?: string;
  description?: string;
  date?: Date;
  duration?: number; // in minutes
  type?: string; // 'technical', 'behavioral', 'ai_generated', 'mixed'
  candidateId?: string | null; // ObjectId string of the Candidate
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Candidate {
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  role?: string | null; // Role they are applying for
  department?: string | null;
  userId: string; // ObjectId string of the User who created/owns this candidate record
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Question {
  // For distinct question entities
  id?: string;
  content: string;
  type: string; // 'text', 'multiple-choice', 'coding'
  options?: string | null; // JSON string for multiple-choice options
  correctAnswer?: string | null;
  domain: string;
  subDomain?: string | null;
  difficulty: string; // 'easy', 'intermediate', 'advanced'
  interviewId: string; // ObjectId string of the Interview
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Message {
  id?: string;
  content: string;
  role: string; // 'user' (candidate), 'assistant' (AI/interviewer), 'system'
  interviewId: string; // ObjectId string of the Interview
  createdAt?: Date;
  updatedAt?: Date;
}
