// app/api/getNotes/route.ts
import { NextResponse } from "next/server";
import Note from "@/models/Note";
import connectDB from "@/lib/mongodb"; // Utility to connect to MongoDB

export async function GET(request: Request) {
  try {
    // Extract query parameters from the request URL
    const { searchParams } = new URL(request.url);
    const userID = searchParams.get("userID");

    // Check if userID is provided
    if (!userID) {
      return NextResponse.json(
        { message: "userID is required" },
        { status: 400 }
      );
    }

    await connectDB(); // Connect to MongoDB

    // Fetch notes for the specific userID, sorted by creation date
    const notes = await Note.find({ userID }).sort({ createdAt: -1 });

    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { message: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}