// models/Note.ts
import mongoose, { Schema, Document } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  pinned: boolean; // Add this field
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    pinned: { type: Boolean, default: false }, // Add this field with a default value of `false`
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

export default mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema);