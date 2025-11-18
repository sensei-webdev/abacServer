import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    courseName: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: Number, required: true },
    durationType: { type: String, required: true },
    students: { type: String, required: true },
    shortStudents: { type: String, required: true },
    rating: { type: Number, required: true },
    totalFee: { type: Number, required: true },
    feePerDuration: { type: Number, required: true },
    activeStatus: { type: Boolean, required: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
