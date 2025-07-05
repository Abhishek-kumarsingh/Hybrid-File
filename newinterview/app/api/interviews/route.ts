import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/lib/db";

// Get all interviews for the current user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch interviews from our database
    const interviews = await db.findInterviewsByUserId(session.user.id);

    return NextResponse.json(interviews);
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch interviews" },
      { status: 500 }
    );
  }
}

// Create a new interview
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    console.log("Request body:", body);

    const { domain, subDomain, level } = body;

    if (!domain || !subDomain || !level) {
      return NextResponse.json(
        { error: "Missing required fields: domain, subDomain, and level are required" },
        { status: 400 }
      );
    }

    // Create an interview in our database
    const interview = await db.createInterview({
      domain,
      subDomain,
      level,
      status: "in_progress",
      userId: session.user.id,
      questions: []
    });

    return NextResponse.json(interview, { status: 201 });
  } catch (error) {
    console.error("Error creating interview:", error);
    return NextResponse.json(
      { error: "Failed to create interview" },
      { status: 500 }
    );
  }
}
