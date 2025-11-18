import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkId: { type: String, unique: true, sparse: true },
    email: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
