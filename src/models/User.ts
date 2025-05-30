import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  image?: string;
  gender?: string;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },

  gender: {
    type: String,
    default: "",
  },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;