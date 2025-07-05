import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

export async function GET() {
  try {
    await dbConnect();

    if (!mongoose.connection.readyState) {
      throw new Error("Database connection is not ready");
    }

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Unable to access database");
    }

    const regions = await db.collection("parksCollection").distinct("region");
    return NextResponse.json(regions);
  } catch (error) {
    console.error("Error in GET function:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
