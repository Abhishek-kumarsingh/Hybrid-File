import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

interface FeedbackData {
  type: 'usability' | 'feature' | 'bug' | 'suggestion' | 'general';
  rating?: number;
  message: string;
  page: string;
  userAgent?: string;
  email?: string;
  name?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

export async function POST(request: Request) {
  try {
    // Connect to the database
    await dbConnect();

    if (!mongoose.connection.readyState) {
      throw new Error("Database connection is not ready");
    }

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Unable to access database");
    }

    // Parse the request body
    const data: FeedbackData = await request.json();

    // Validate required fields
    if (!data.message || !data.type || !data.page) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Add timestamp
    const feedbackWithTimestamp = {
      ...data,
      createdAt: new Date(),
      status: 'new', // For tracking feedback status (new, reviewed, resolved)
    };

    // Store in the database
    const result = await db.collection("userFeedback").insertOne(feedbackWithTimestamp);

    return NextResponse.json({
      success: true,
      message: "Feedback submitted successfully",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve feedback (for admin dashboard)
export async function GET(request: Request) {
  try {
    // Connect to the database
    await dbConnect();

    if (!mongoose.connection.readyState) {
      throw new Error("Database connection is not ready");
    }

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Unable to access database");
    }

    // Get URL parameters
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = parseInt(searchParams.get('skip') || '0');

    // Build query
    const query: Record<string, any> = {};
    if (type) query.type = type;
    if (status) query.status = status;

    // Fetch feedback with pagination
    const feedback = await db.collection("userFeedback")
      .find(query)
      .sort({ createdAt: -1 }) // Most recent first
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get total count for pagination
    const total = await db.collection("userFeedback").countDocuments(query);

    return NextResponse.json({
      feedback,
      pagination: {
        total,
        limit,
        skip,
        hasMore: skip + limit < total,
      },
    });
  } catch (error) {
    console.error("Error retrieving feedback:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
