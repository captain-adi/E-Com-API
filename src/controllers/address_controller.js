import { Address } from "../models/address_model.js";
import User from "../models/user_model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
import ErrorHandler from "../utils/ErrorHander.js";

const addNewAddress = asyncHandler(async (req, res) => {
  const addressData = req.body; // Use entire req.body instead of destructuring
  const newAddress = await Address.create(addressData);
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  user.address.push(newAddress._id);
  await user.save();
  res
    .status(201)
    .json(new ApiResponse(true, "Address added successfully", 201, newAddress));
});

const getAllAddress = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).populate("address");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res
    .status(200)
    .json(
      new ApiResponse(true, "Addresses fetched successfully", 200, user.address)
    );
});

const editAddress = asyncHandler(async (req, res) => {
  res.send("Edit address");
});
const deleteAddress = asyncHandler(async (req, res) => {
  const addressId = req.params.id;
  const userId = req.user._id;
  const user = await User.findByIdAndUpdate(userId, {
    $pull: { address: addressId },
  });

  const deleteAddress = await Address.findByIdAndDelete(addressId);
  console.log("delete Address is ,", deleteAddress);
  res
    .status(200)
    .json(
      new ApiResponse(true, "Address deleted successfully", 200, deleteAddress)
    );
});
export { addNewAddress, getAllAddress, editAddress, deleteAddress };
