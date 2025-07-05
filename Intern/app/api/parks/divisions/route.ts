import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const region = searchParams.get("region");

  const mongoose = await dbConnect();
  const db = mongoose.connection.db;
  if (!db) {
    return NextResponse.json(
      { message: "Database connection failed" },
      { status: 500 }
    );
  }
  const divisions = await db
    .collection("parksCollection")
    .distinct("division", { region });
  return NextResponse.json(divisions);
}
