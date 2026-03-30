import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import Backlist from "../models/backlist.model.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "token not found" });
  }
  const isBacklisted = await Backlist.findOne({ token });
  if (isBacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const authsystemUserMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const isBacklisted = await Backlist.findOne({ token });
  if (isBacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded.userId).select("+systemUser");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!user.systemUser) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
