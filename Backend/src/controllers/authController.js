import User from "../models/User.js";
import Post from "../models/Post.js";
import { comparePassword, hashedPassword } from "../utils/Bcrypt.js";
import { generateToken } from "../utils/Jwt.js";
import crypto from "crypto";
import cloudinary from "../lib/Cloudinary.js";
import fs from "fs";
import { ForgetPasswordEmail, RegistrationConfirmationEmail, WelcomeEmail } from '../config/emailTemplates.js';
import sendMail from './../lib/SendMail.js';


export const registerUser = async (req, res) => {
    try {
        const { name, userName, email, password } = req.body;

        // Basic validation
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "Please fill all required fields." });
        }

        // Check if user exists by email or userName
        const userExists = await User.findOne({
            $or: [{ email }, { userName }],
        });
        if (userExists) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Hash password
        const hash = await hashedPassword(password)

        // Create user
        const newUser = new User({
            name,
            userName,
            email,
            password: hash,
        });

        await newUser.save();

        // Generate token
        const token = await generateToken(newUser);

        const subject = "Registration Successful!";
        const html = RegistrationConfirmationEmail(userName);
        await sendMail(email, "Social", subject, html);


        // Set token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Send back user data except password
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                userName: newUser.userName,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        if (!identifier || !password) {
            return res.status(400).json({ message: "Please provide userName/email and password." });
        }

        // Find user by userName OR email
        const user = await User.findOne({
            $or: [{ userName: identifier.toLowerCase() }, { email: identifier.toLowerCase() }],
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Check password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Generate token
        const token = await generateToken(user);

        const subject = "Welcome to Social!";
        const html = WelcomeEmail(identifier);
        await sendMail(identifier, "Social", subject, html);

        // Set token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        const populatePost = await Promise.all(
            user.posts.map(async (postId) => {
                const post = await Post.findById(postId);
                if (post.author.equals(user._id)) return post;
                return null;
            })
        );
        // Send user data without password
        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                userName: user.userName,
                email: user.email,
                profileImage: user.profileImage,
                followers: user.followers,
                following: user.following,
                posts: populatePost.filter((post) => post !== null), 
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const logoutUser = (_, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0), // Expire cookie immediately
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    res.json({ message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        // Generate a 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();

        // Set OTP and expiry (e.g., 10 minutes from now)
        user.otp = otp;
        user.otpExpiry = Date.now() + 100 * 60 * 1000;
        user.verifyOTP = false;

        await user.save();

        const subject = "Email Verification Code";
        const html = ForgetPasswordEmail(otp, email);
        await sendMail(email, "Social", subject, html);


        res.json({ message: "OTP sent to your email" });
    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required." });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found." });

        if (
            !user.otp ||
            user.otp !== otp ||
            !user.otpExpiry ||
            user.otpExpiry < Date.now()
        ) {
            return res.status(400).json({ message: "Invalid or expired OTP." });
        }

        // Set OTP as verified and clear stored OTP
        user.verifyOTP = true;
        user.otp = null;
        user.otpExpiry = null;

        await user.save();

        res.json({ message: "OTP verified. You may now reset your password." });
    } catch (error) {
        console.error("OTP Verification Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const resetPassword = async (req, res) => {
    const { newPassword, email } = req.body;

    if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found." });

        if (!user.verifyOTP) {
            return res.status(403).json({ message: "OTP verification required before resetting password." });
        }

        // Hash the new password
        const hash = await hashedPassword(newPassword);

        user.password = hash;
        user.verifyOTP = false;
        await user.save();

        res.json({ message: "Password reset successfully." });
    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId)
            .select("-password -otp -otpExpiry -verifyOTP")
            .populate("followers", "userName profileImage")
            .populate("following", "userName profileImage")
            .populate("posts", "content createdAt likes comments image");

        if (!user) return res.status(404).json({ message: "User not found." });

        res.json(user);
    } catch (error) {
        console.error("Get Profile Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const editProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { name, bio, gender } = req.body;

        // Build update object conditionally
        const updatedData = {};
        if (name) updatedData.name = name;
        if (bio) updatedData.bio = bio;
        if (gender) updatedData.gender = gender;

        // Handle image upload if file exists
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "social/profileImages",
                use_filename: true,
                unique_filename: false,
            });

            updatedData.profileImage = result.secure_url;

            // Remove the file from local temp storage
            fs.unlinkSync(req.file.path);
        }

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updatedData },
            {
                new: true,
                runValidators: true,
            }
        ).select("-password -resetPasswordOTP -resetPasswordOTPExpire -isOTPVerified");

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Edit profile error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message,
        });
    }
};

export const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.user?.id;

        // Validate userId
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized: User not authenticated." });
        }

        // Get current user
        const currentUser = await User.findById(userId);
        if (!currentUser) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Collect IDs to exclude (current user + following)
        const excludeIds = [userId, ...currentUser.following];

        // Find users not followed by the current user
        const suggestedUsers = await User.find({ _id: { $nin: excludeIds } })
            .select("userName name profileImage bio")
            .limit(10);

        res.status(200).json({
            success: true,
            users: suggestedUsers,
        });
    } catch (error) {
        console.error("getSuggestedUsers error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const toggleFollow = async (req, res) => {
    try {
        const targetUserId = req.params.id;
        const currentUserId = req.user?.id;

        if (targetUserId === currentUserId.toString()) {
            return res.status(400).json({ message: "You cannot follow/unfollow yourself." });
        }

        const targetUser = await User.findById(targetUserId);
        const currentUser = await User.findById(currentUserId);

        if (!targetUser || !currentUser) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if already following
        if (targetUser.followers.includes(currentUserId)) {
            // Unfollow
            targetUser.followers = targetUser.followers.filter(
                (id) => id.toString() !== currentUserId.toString()
            );
            currentUser.following = currentUser.following.filter(
                (id) => id.toString() !== targetUserId.toString()
            );
            await targetUser.save();
            await currentUser.save();

            return res.status(200).json({ message: "User unfollowed successfully." });
        } else {
            // Follow
            targetUser.followers.push(currentUserId);
            currentUser.following.push(targetUserId);

            await targetUser.save();
            await currentUser.save();

            return res.status(200).json({ message: "User followed successfully." });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


export const getFriends = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ message: "Invalid or missing user ID" });
        }
        const user = await User.findById(userId)
            .populate({
                path: "following",
                select: "userName bio profileImage",
                options: { sort: { createdAt: -1 } }
            });


        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "Friends list fetched successfully",
            friends: user.following,
        });
    } catch (error) {
        console.log("Get Friends Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};