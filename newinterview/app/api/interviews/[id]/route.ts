import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { db } from "@/lib/db";
import { authOptions } from "../../auth/[...nextauth]/route";
import { ensureSampleInterview } from "@/lib/sample-interviews";

// Get a specific interview
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(`GET request for interview ID: ${params.id}`);

  try {
    // Check if this is a request from the take interview page
    const referer = req.headers.get('referer') || '';
    console.log(`Referer: ${referer}`);
    const isTakeInterviewRequest = referer.includes(`/dashboard/interviews/${params.id}/take`);
    console.log(`Is take interview request: ${isTakeInterviewRequest}`);

    // Get session (if available)
    const session = await getServerSession(authOptions);
    console.log(`Session user: ${session?.user?.id || 'No session'}`);

    // Fetch the interview from our database
    console.log(`Fetching interview with ID: ${params.id}`);
    const interview = await db.findInterviewById(params.id);
    console.log(`Interview found: ${interview ? 'Yes' : 'No'}`);

    // Special handling for sample interviews
    if (params.id.startsWith('sample-interview')) {
      console.log(`Handling sample interview: ${params.id}`);

      try {
        // Use our utility function to ensure the sample interview exists
        const sampleInterview = await ensureSampleInterview(
          params.id,
          session?.user?.id || "admin-1"
        );

        // If we just created the interview, fetch it again with all related data
        if (!interview) {
          console.log(`Sample interview ${params.id} was created, fetching complete data`);
          return await GET(req, { params });
        }
      } catch (error) {
        console.error(`Error ensuring sample interview ${params.id}:`, error);
        // Continue with the existing interview if available, otherwise will return 404 below
      }
    }

    if (!interview) {
      console.error(`Interview with ID ${params.id} not found`);
      return NextResponse.json({
        error: "Interview not found",
        message: `The interview with ID "${params.id}" could not be found in the database.`,
        availableSampleIds: ["sample-interview-1", "sample-interview-2", "sample-interview-3"]
      }, { status: 404 });
    }

    // If this is not a take interview request, verify authentication
    if (!isTakeInterviewRequest) {
      // Check if user is authenticated
      if (!session || !session.user) {
        console.log('Unauthorized: No valid session found');
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      // Check if the user has access to this interview
      if (interview.userId !== session.user.id) {
        console.error(`User ${session.user.id} not authorized to access interview ${params.id}`);
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }
    }

    // Fetch candidate data
    console.log(`Fetching candidate with ID: ${interview.candidateId}`);
    const candidate = await db.findCandidateById(interview.candidateId);
    console.log(`Candidate found: ${candidate ? 'Yes' : 'No'}`);

    // Fetch messages for this interview
    console.log(`Fetching messages for interview ID: ${params.id}`);
    const messages = await db.findMessagesByInterviewId(interview.id);
    console.log(`Messages found: ${messages.length}`);

    // Return the enriched interview with candidate and messages
    const enrichedInterview = {
      ...interview,
      candidate: candidate || null,
      messages: messages || []
    };

    console.log(`Returning enriched interview: ${JSON.stringify(enrichedInterview)}`);
    return NextResponse.json(enrichedInterview);
  } catch (error) {
    console.error("Error fetching interview:", error);
    return NextResponse.json(
      { error: "Failed to fetch interview" },
      { status: 500 }
    );
  }
}

// Update an interview
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, date, duration, type, status, score, feedback } = body;

    // Fetch the interview from our database
    const interview = await db.findInterviewById(params.id);

    if (!interview) {
      console.error(`Interview with ID ${params.id} not found`);
      return NextResponse.json({ error: "Interview not found" }, { status: 404 });
    }

    // Check if the user has access to this interview
    if (interview.userId !== session.user.id) {
      console.error(`User ${session.user.id} not authorized to access interview ${params.id}`);
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Update the interview in our database
    const updateData = {
      ...(title && { title }),
      ...(description !== undefined && { description }),
      ...(date && { date: new Date(date) }),
      ...(duration && { duration: parseInt(duration.toString()) }),
      ...(type && { type }),
      ...(status && { status }),
      ...(score !== undefined && { score: parseInt(score.toString()) }),
      ...(feedback !== undefined && { feedback }),
    };

    console.log(`Updating interview ${params.id} with data:`, updateData);

    const updatedInterview = await db.updateInterview(params.id, updateData);

    if (!updatedInterview) {
      return NextResponse.json({ error: "Failed to update interview" }, { status: 500 });
    }

    // Fetch candidate data for the response
    const candidate = await db.findCandidateById(updatedInterview.candidateId);

    // Return the enriched interview with candidate
    const enrichedInterview = {
      ...updatedInterview,
      candidate: candidate || null,
    };

    return NextResponse.json(enrichedInterview);
  } catch (error) {
    console.error("Error updating interview:", error);
    return NextResponse.json(
      { error: "Failed to update interview" },
      { status: 500 }
    );
  }
}

// Delete an interview
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the interview from our database
    const interview = await db.findInterviewById(params.id);

    if (!interview) {
      console.error(`Interview with ID ${params.id} not found`);
      return NextResponse.json({ error: "Interview not found" }, { status: 404 });
    }

    // Check if the user has access to this interview
    if (interview.userId !== session.user.id) {
      console.error(`User ${session.user.id} not authorized to access interview ${params.id}`);
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // In a real application, you would delete the interview from your database
    // For this demo, we'll just return a success message

    return NextResponse.json({ message: "Interview deleted successfully" });
  } catch (error) {
    console.error("Error deleting interview:", error);
    return NextResponse.json(
      { error: "Failed to delete interview" },
      { status: 500 }
    );
  }
}
