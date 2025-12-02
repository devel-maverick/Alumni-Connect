import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import User from "../models/user.model.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];
    if (!token) {
      console.log(" Socket rejected: No token");
      return next(new Error("unauthorized - no token"));
    }
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded || !decoded.id) {
      console.log(" Socket rejected: Invalid token");
      return next(new Error("unauthorized - invalid token"));
    }
    const user = await User.findById(decoded.id).select(
      "fullName email profilePic"
    );
    if (!user) {
      console.log(" Socket rejected: User not found");
      return next(new Error("user not found"));
    }
    socket.user = user;
    socket.userId = user.id.toString();
    console.log(`Socket authenticated: ${user.fullName}`);
    next();
  } catch (err) {
    console.log(" Socket Auth Error:", err.message);
    next(new Error("unauthorized - auth failed"));
  }
};
