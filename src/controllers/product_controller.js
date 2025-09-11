import asyncHandler from "../utils/AsyncHandler.js";
import Product from "../models/product_model.js";
import ApiResponse from "../utils/ApiResponse.js";

const getAllProducts = asyncHandler(async (req, res) => {
  const data = await Product.find();
  res
    .status(200)
    .json(
      new ApiResponse(true, "All Products Fetched Successfully", data, 200)
    );
});

export { getAllProducts };
