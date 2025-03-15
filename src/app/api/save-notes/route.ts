// app/api/saveNote/route.ts
import { NextResponse } from "next/server";
import Note from "@/models/Note";
import connectDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB(); // Connect to MongoDB

    const { userID, title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }
    const newNote = new Note({ userID, title, content });
    await newNote.save();

    return NextResponse.json(
      { message: "Note saved successfully", note: newNote },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving note:", error);
    return NextResponse.json(
      { message: "Failed to save note" },
      { status: 500 }
    );
  }
}
