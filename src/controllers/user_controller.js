// import User from "../models/user_model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";

const getUser = asyncHandler(async (req, res) => {});

const addToBag = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const user = req.user;
  if (!productId || !quantity) {
    return res
      .status(400)
      .json(
        new ApiResponse(false, "Product ID and quantity are required", 400)
      );
  }
  const product = user.bagItems.find(
    (items) => items.productId.toString() === productId
  );
  if (product) {
    product.quantity += quantity;
  } else {
    user.bagItems.push({ productId, quantity });
    await user.save();
    res
      .status(200)
      .json(
        new ApiResponse(true, "Item added to bag", 200, { productId, quantity })
      );
    return;
  }
  await user.save();
  res
    .status(200)
    .json(new ApiResponse(true, "Item added to bag", 200, product));
});

const removeFromBag = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const user = req.user;
  const updatedBagItems = user.bagItems.filter(
    (item) => item.productId.toString() !== productId
  );
  console.log(updatedBagItems.length);
  user.bagItems = updatedBagItems;
  await user.save();
  res
    .status(200)
    .json(new ApiResponse(true, "Item removed from bag", 200, productId));
});

const getBagItems = asyncHandler(async (req, res) => {
  const user = req.user;

  res
    .status(200)
    .json(new ApiResponse(true, "Bag items fetched", 200, user.bagItems));
});

export { addToBag, removeFromBag, getBagItems };
