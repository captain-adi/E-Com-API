import User from "../models/user_model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
import ErrorHandler from "../utils/ErrorHander.js";
import bycrypt from "bcrypt";

const options = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new ErrorHandler("user already exists", 400);
  }
  const hashedPassword = await bycrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const accessToken = newUser.generateAccessToken();

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(true, "user registered successfully", 200, {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      })
    );
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).populate("address");
  if (!user) {
    throw new ErrorHandler("you do not have account please signup!", 401);
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new ErrorHandler("Password is incorrect ", 401);
  }

  const accessToken = await user.generateAccessToken();

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(true, "login successful", 200, {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          address: user.address,
        },
      })
    );
});

const logout = asyncHandler(async (req, res) => {
  res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(true, "Logout successful", 200));
});

const isAuth = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("address");
  res.status(200).json(
    new ApiResponse(true, "User is loggedin ", 200, {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        address: user.address,
      },
    })
  );
});

export { signup, login, logout, isAuth };
