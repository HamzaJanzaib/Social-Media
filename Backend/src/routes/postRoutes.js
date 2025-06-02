const express = require('express');
import { protect } from './../middleware/authMiddleware';
import upload from './../config/multer';
import { addComment, createPost, deleteComment, deletePost, getAllPosts, getAllSavedPosts, getPostComment, getUserPost, likeComment, likePost, savedPost, unlikeComment, unlikePost } from '../controllers/postController';

const router = express.Router();

// Create a new post
router.post("/create", protect, upload.single("file"), createPost)

// Get all posts
router.post("/AllPost", getAllPosts)

// Get posts by a specific user
router.post("/userPost", protect, getUserPost)

// Delete a post by ID
router.delete("/Delete/:id", protect, deletePost)

// Like a post by ID
router.post("/like/:id", protect, likePost)

// Unlike a post by ID
router.post("/unlike/:id", protect, unlikePost)

// Add a comment to a post by ID
router.post("/comment/:id", protect, addComment)

// Get comments for a post by ID
router.post("/getComment/:id", getPostComment)

// Like a comment by ID
router.post("/likeComment/:id", protect, likeComment)

// Unlike a comment by ID
router.post("/unlikeComment/:id", protect, unlikeComment)

// Delete a comment by ID
router.delete("/DeleteComment/:id", protect, deleteComment)

// Toggle saved status for a post by ID
router.post("/togleSaved/:id", protect, savedPost)

// Get all saved posts for the user
router.get("/saved", protect, getAllSavedPosts)

export default router;