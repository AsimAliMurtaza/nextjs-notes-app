// models/Note.ts
import mongoose, { Schema, Document } from "mongoose";

export interface INote extends Document {
  userID: string;
  title: string;
  content: string;
  pinned: boolean; // Add this field
  createdAt: Date;
  updatedAt: Date;
}
const NoteSchema: Schema = new Schema(
  {
    userID: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    pinned: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now, immutable: true }, // `immutable: true` ensures it never changes
    updatedAt: { type: Date, default: Date.now }, // Will be updated manually
  }
);

// Middleware to update `updatedAt` on save
NoteSchema.pre("save", function (next) {
  if (!this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

export default mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema);
