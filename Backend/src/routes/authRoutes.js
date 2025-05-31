// routes/authRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  verifyOTP,
  getProfile,
  editProfile,
} from "../controllers/authController.js";
import { validateLoginInput, validateRegisterInput } from "../middleware/validatorsMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../config/multer.js";

const router = express.Router();

// Register new user
router.post("/register", validateRegisterInput, registerUser);

// Login user
router.post("/login", validateLoginInput, loginUser);

// Logout user
router.post("/logout", logoutUser);

// Forgot password - send OTP
router.post("/forgot-password", forgotPassword);

// Verify OTP for password reset
router.post("/verify-otp", verifyOTP);

// Reset password after OTP verification
router.post("/reset-password", resetPassword);

// GET /api/profile/:id - Get user's profile
router.get("/:id", getProfile);

// Put /api/editProfile - Edit protect user's profile
router.put("/editProfile", protect, upload.single("profileImage"), editProfile);

export default router;
