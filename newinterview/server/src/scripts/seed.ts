// seed.ts
// src/scripts/seed.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db"; // Path to your db connection setup
import User from "../models/User";
import Candidate from "../models/Candidate";
import Interview from "../models/Interview";
import Question from "../models/Question"; // For distinct questions
import Message from "../models/Message";

dotenv.config({ path: "../../.env" }); // Adjust path if seed.ts is deeper

const seedData = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected for seeding...");

    // Clear existing data
    console.log("Clearing existing data...");
    await User.deleteMany({});
    await Candidate.deleteMany({});
    await Interview.deleteMany({});
    await Question.deleteMany({});
    await Message.deleteMany({});
    console.log("Existing data cleared.");

    // Create Admin User
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "adminpassword", // Will be hashed by pre-save hook
      role: "admin",
    });
    console.log("Admin user created:", adminUser.email);

    // Create another user (interviewer)
    const interviewerUser = await User.create({
      name: "Interviewer Jane",
      email: "jane.interviewer@example.com",
      password: "janepassword",
      role: "interviewer",
    });
    console.log("Interviewer user created:", interviewerUser.email);

    // --- Candidate 1 and their Interviews ---
    const candidate1 = await Candidate.create({
      name: "Alice Wonderland",
      email: "alice.wonder@example.com",
      phone: "555-0101",
      role: "Frontend Developer",
      department: "Engineering",
      userId: adminUser.id, // or adminUser._id
    });
    console.log("Candidate 1 created:", candidate1.name);

    const aiInterview1 = await Interview.create({
      domain: "frontend",
      subDomain: "React",
      level: "intermediate",
      status: "completed",
      score: 88,
      overallFeedback:
        "Alice demonstrated strong knowledge of React fundamentals and practical application. Good problem-solving skills.",
      userId: interviewerUser.id, // Interviewer
      candidateId: candidate1.id,
      type: "ai_generated",
      questions: [
        {
          question: "Explain Virtual DOM.",
          answer: "Alice provided a clear explanation.",
          feedback: "Good.",
        },
        {
          question: "What are React Hooks?",
          answer: "Alice explained useState and useEffect well.",
          feedback: "Excellent examples.",
        },
      ],
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    });
    console.log("AI Interview 1 for Alice created:", aiInterview1.id);

    await Message.create([
      {
        content: "Welcome to your AI interview, Alice!",
        role: "system",
        interviewId: aiInterview1.id,
        createdAt: new Date(aiInterview1.createdAt!),
      },
      {
        content: "Tell me about Virtual DOM.",
        role: "assistant",
        interviewId: aiInterview1.id,
        createdAt: new Date(aiInterview1.createdAt!),
      },
      {
        content: "The Virtual DOM is a programming concept...",
        role: "user",
        interviewId: aiInterview1.id,
        createdAt: new Date(aiInterview1.createdAt!),
      },
    ]);

    const scheduledInterview1 = await Interview.create({
      title: "Frontend Technical Screen",
      description: "Initial technical screen for Frontend Developer role.",
      domain: "frontend",
      subDomain: "JavaScript",
      level: "intermediate",
      status: "scheduled",
      userId: interviewerUser.id,
      candidateId: candidate1.id,
      type: "technical",
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      duration: 60,
      questions: [], // Questions will be linked separately
    });
    console.log(
      "Scheduled Interview 1 for Alice created:",
      scheduledInterview1.id
    );

    await Question.create([
      {
        content: "What is a closure in JavaScript?",
        type: "text",
        domain: "frontend",
        subDomain: "JavaScript",
        difficulty: "intermediate",
        interviewId: scheduledInterview1.id,
      },
      {
        content: "Explain event delegation.",
        type: "text",
        domain: "frontend",
        subDomain: "JavaScript",
        difficulty: "intermediate",
        interviewId: scheduledInterview1.id,
      },
    ]);
    await Message.create({
      content:
        "Hi Alice, this interview is scheduled for next week. Please confirm.",
      role: "system",
      interviewId: scheduledInterview1.id,
    });

    // --- Candidate 2 and their Interview ---
    const candidate2 = await Candidate.create({
      name: "Bob The Builder",
      email: "bob.builder@example.com",
      phone: "555-0202",
      role: "Backend Developer",
      department: "Engineering",
      userId: adminUser.id,
    });
    console.log("Candidate 2 created:", candidate2.name);

    const backendInterview1 = await Interview.create({
      title: "Node.js Backend Interview",
      domain: "backend",
      subDomain: "Node.js",
      level: "senior",
      status: "in_progress",
      userId: interviewerUser.id,
      candidateId: candidate2.id,
      type: "technical",
      date: new Date(),
      duration: 90,
      questions: [], // Will be linked separately
    });
    console.log("Backend Interview 1 for Bob created:", backendInterview1.id);

    await Question.create([
      {
        content: "Explain the Node.js event loop.",
        type: "text",
        domain: "backend",
        subDomain: "Node.js",
        difficulty: "advanced",
        interviewId: backendInterview1.id,
      },
      {
        content: "How do you handle errors in asynchronous Node.js code?",
        type: "text",
        domain: "backend",
        subDomain: "Node.js",
        difficulty: "advanced",
        interviewId: backendInterview1.id,
      },
    ]);
    await Message.create([
      {
        content: "Hi Bob, ready to start your backend interview?",
        role: "assistant",
        interviewId: backendInterview1.id,
      },
      {
        content: "Yes, I am ready!",
        role: "user",
        interviewId: backendInterview1.id,
      },
    ]);

    console.log("Seed data created successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.disconnect();
    console.log("MongoDB disconnected after seeding.");
  }
};

seedData();
