// app/api/pin-notes/route.ts
import { NextResponse } from "next/server";
import Note from "@/models/Note";
import connectDB from "@/lib/mongodb";

export async function PUT(request: Request) {
  await connectDB();

  const { noteId, pinned } = await request.json();

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { pinned },
      { new: true }
    );

    if (!updatedNote) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Note updated successfully", updatedNote },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error pinning/unpinning note:", error);
    return NextResponse.json(
      { message: "Failed to update note" },
      { status: 500 }
    );
  }
}
