import mongoose from "mongoose";
export const categorySchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    image: String,
  },
  { timestamps: true }
);
export const Category = mongoose.model("Category", categorySchema);
