import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendRegistrationEmail } from "../services/email.service.js";

export const userRegisterController = async (req, res) => {
  const { name, email, password } = req.body;

  const isexisting = await User.findOne({
    email: email,
  });
  if (isexisting) {
    return res.status(422).json({
      message: "User already exists",
      success: false,
    });
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "2d",
  });
  res.cookie("token", token);
  res.status(201).json({
    message: "User registered successfully",
    success: true,
    token,
  });
  // Send registration email
  await sendRegistrationEmail(user.name, user.email);
};
export const userLoginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  }).select("+password");
  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
      success: false,
    });
  }
  const isvalid = await user.matchPassword(password);
  if (!isvalid) {
    return res.status(401).json({
      message: "Invalid credentials",
      success: false,
    });
  }
  const token = jwt.sign({ userId: User._id }, process.env.SECRET_KEY, {
    expiresIn: "2d",
  });
  res.cookie("token", token);
  res.status(200).json({
    message: "User logged in successfully",
    success: true,
    token,
  });
};
