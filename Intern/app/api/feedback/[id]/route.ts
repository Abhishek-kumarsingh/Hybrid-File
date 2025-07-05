import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";

// GET a specific feedback item by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    // Check if ID is valid
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: "Invalid feedback ID" },
        { status: 400 }
      );
    }

    // Fetch the feedback item
    const feedback = await db.collection("userFeedback").findOne({
      _id: new ObjectId(params.id),
    });

    if (!feedback) {
      return NextResponse.json(
        { error: "Feedback not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(feedback);
  } catch (error) {
    console.error("Error retrieving feedback:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PATCH to update feedback status
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Connect to the database
    await dbConnect();

    if (!mongoose.connection.readyState) {
      throw new Error("Database connection is not ready");
    }

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Unable to access database");
    }

    // Check if ID is valid
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: "Invalid feedback ID" },
        { status: 400 }
      );
    }

    // Parse the request body
    const data = await request.json();
    
    // Validate the status
    const validStatuses = ['new', 'reviewed', 'resolved', 'archived'];
    if (data.status && !validStatuses.includes(data.status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: Record<string, any> = {};
    if (data.status) updateData.status = data.status;
    
    // Add updatedAt timestamp
    updateData.updatedAt = new Date();
    
    // Add who updated it
    updateData.updatedBy = {
      email: session.user?.email,
      name: session.user?.name,
    };

    // Update the feedback
    const result = await db.collection("userFeedback").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Feedback not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Feedback updated successfully",
    });
  } catch (error) {
    console.error("Error updating feedback:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE a feedback item
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Connect to the database
    await dbConnect();

    if (!mongoose.connection.readyState) {
      throw new Error("Database connection is not ready");
    }

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Unable to access database");
    }

    // Check if ID is valid
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: "Invalid feedback ID" },
        { status: 400 }
      );
    }

    // Delete the feedback
    const result = await db.collection("userFeedback").deleteOne({
      _id: new ObjectId(params.id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Feedback not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
