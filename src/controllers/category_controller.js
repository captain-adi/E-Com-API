import asyncHandler from "../utils/AsyncHandler.js";
import { Category } from "../models/category_model.js";
import ApiResponse from "../utils/ApiResponse.js";
const getAllCategories = asyncHandler(async (req, res) => {
  const categoryData = await Category.find();
  res
    .status(200)
    .json(
      new ApiResponse(
        true,
        "All Categories Fetched Successfully",
        categoryData,
        200
      )
    );
});

export { getAllCategories };
