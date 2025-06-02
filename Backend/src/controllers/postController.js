import Post from "../models/Post.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import sharp from "sharp";
import fs from "fs";
import Comment from "../models/Comment.js";

export const createPost = async (req, res) => {
    try {
        const { caption } = req.body;
        const userId = req.user?.id;

        const postData = {
            caption,
            author: userId,
        };
        if (req.file) {
            const inputPath = req.file.path;
            const outputPath = `uploads/optimized-${Date.now()}.jpeg`;

            // Resize & optimize image using sharp
            await sharp(inputPath)
                .resize(800, 800, { fit: "inside" })
                .toFormat("jpeg", { quality: 80 })
                .toFile(outputPath);

            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(outputPath, {
                folder: "social/posts",
                use_filename: true,
                unique_filename: false,
            });

            postData.image = result.secure_url;

            // Cleanup temp files
            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);
        }

        const post = await Post.create(postData);
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        user.posts.push(post._id);
        await user.save();

        await post.populate("author", "-password -email -__v");

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            post,
        });
    } catch (error) {
        console.error("Create Post Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate(
                {
                    path: "author",
                    select: "userName profileImage",
                }
            )
            .populate({
                path: "comments",
                sort: { createdAt: -1 },
                select: "text createdAt author",
                populate: {
                    path: "author",
                    select: "userName profileImage"
                }
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: posts.length,
            posts,
        });
    } catch (error) {
        console.error("Get All Posts Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching posts",
        });
    }
};

export const getUserPost = async (req, res) => {
    try {
        const userId = req.user?.id;

        // Validate userId
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }
        const posts = await Post.find({ author: userId }).sort({ createdAt: -1 })
            .populate({
                path: "author",
                select: "userName profileImage"
            })
            .populate({
                path: "comments",
                sort: { createdAt: -1 },
                select: "text createdAt author",
                populate: {
                    path: "author",
                    select: "userName profileImage"
                }
            });
        if (!posts || posts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No posts found for this user",
            });
        }
        res.status(200).json({
            success: true,
            count: posts.length,
            posts,
        });

    } catch (error) {
        console.error("Get User Post Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching user posts",
        });
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user?.id;

        // Validate postId and userId
        if (!postId || !userId) {
            return res.status(400).json({ success: false, message: "Post ID and User ID are required" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        // Check if the user is the author of the post
        if (post.author.toString() !== userId) {
            return res.status(403).json({ success: false, message: "You are not authorized to delete this post" });
        }

        // Delete the post
        await Post.findByIdAndDelete(postId);
        // Remove post reference from user's posts array
        await User.findByIdAndUpdate(userId, { $pull: { posts: postId } });
        // Delete all comments associated with the post
        await Comment.deleteMany({ post: postId });

        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
        });
    } catch (error) {
        console.error("Delete Post Error:", error);
        res.status(500).json({ success: false, message: "Server error while deleting post" });
    }
};

export const likePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user?.id;

        // Validate postId and userId
        if (!postId || !userId) {
            return res.status(400).json({ success: false, message: "Post ID and User ID are required" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        await post.updateOne({ $addToSet: { likes: userId } });

        await post.save();

        //implement Socket.io event for real-time updates

        res.status(200).json({
            success: true,
            message: "Post liked successfully",
            likesCount: post.likes.length,
        });
    } catch (error) {
        console.error("Like Post Error:", error);
        res.status(500).json({ success: false, message: "Server error while liking post" });
    }
}

export const unlikePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user?.id;

        // Validate postId and userId
        if (!postId || !userId) {
            return res.status(400).json({ success: false, message: "Post ID and User ID are required" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        await post.updateOne({ $pull: { likes: userId } });

        await post.save();

        //implement Socket.io event for real-time updates

        res.status(200).json({
            success: true,
            message: "Post unliked successfully",
            likesCount: post.likes.length,
        });
    } catch (error) {
        console.error("Unlike Post Error:", error);
        res.status(500).json({ success: false, message: "Server error while unliking post" });
    }
}

export const addComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user?.id;

        const { text } = req.body;
        const post = await Post.findById(postId);
        // Validate postId and userId
        if (!postId || !userId) return res.status(400).json({ success: false, message: "Post ID and User ID are required" });
        if (!text) return res.status(400).json({ success: false, message: "comment content required" });

        const comment = await Comment.create({
            content: text,
            author: userId,
            post: postId,
        });

        await comment.populate({
            path: "author",
            select: "userName profileImage"
        });

        post.comments.push(comment._id)
        await post.save();

        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment
        });

    } catch (error) {
        console.error("addComment at Post Error:", error);
        res.status(500).json({ success: false, message: "Server error while addComment at post" });
    }
}

export const getPostComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const comment = await Comment.find({ post: postId }).populate({
            path: "author",
            select: "userName profileImage"
        });

        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        res.status(200).json({
            success: true,
            comment
        });
    } catch (error) {
        console.error("getPostComment Error:", error);
        res.status(500).json({ success: false, message: "Server error while getting post comments" });
    }
}

export const likeComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const userId = req.user?.id;

        if (!commentId || !userId) {
            return res.status(400).json({ success: false, message: "Comment ID and User ID are required" });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        await comment.updateOne({ $addToSet: { likes: userId } });
        await comment.save();

        res.status(200).json({
            success: true,
            message: "Comment liked successfully",
            likesCount: comment.likes.length,
        });
    } catch (error) {
        console.error("Like Comment Error:", error);
        res.status(500).json({ success: false, message: "Server error while liking comment" });
    }
};

export const unlikeComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const userId = req.user?.id;

        if (!commentId || !userId) {
            return res.status(400).json({ success: false, message: "Comment ID and User ID are required" });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        await comment.updateOne({ $pull: { likes: userId } });
        await comment.save();

        res.status(200).json({
            success: true,
            message: "Comment unliked successfully",
            likesCount: comment.likes.length,
        });
    } catch (error) {
        console.error("Unlike Comment Error:", error);
        res.status(500).json({ success: false, message: "Server error while unliking comment" });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const userId = req.user?.id;

        if (!commentId || !userId) {
            return res.status(400).json({ success: false, message: "Comment ID and User ID are required" });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        // Only author of comment or author of post can delete
        const post = await Post.findById(comment.post);
        if (
            comment.author.toString() !== userId &&
            post.author.toString() !== userId
        ) {
            return res.status(403).json({ success: false, message: "You are not authorized to delete this comment" });
        }

        // Remove comment from post's comments array
        await Post.findByIdAndUpdate(comment.post, { $pull: { comments: commentId } });

        // Delete the comment
        await Comment.findByIdAndDelete(commentId);

        res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        });
    } catch (error) {
        console.error("Delete Comment Error:", error);
        res.status(500).json({ success: false, message: "Server error while deleting comment" });
    }
};

export const savedPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user?.id;

        if (!postId || !userId) {
            return res.status(400).json({ success: false, message: "Post ID and User ID are required" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        const user = await User.findById(postId);
        if (user.savedPosts.includes(post._id)) {
            await user.updateOne({ $pull: { savedPosts: post._id } });
            await user.save();
            return res.status(200).json({
                type: "unsaved",
                success: true,
                message: "Post removed from saved",
            });
        } else {
            await user.updateOne({ $addToSet: { savedPosts: post._id } });
            await user.save();
            return res.status(200).json({
                type: "saved",
                success: true,
                message: "Post saved successfully",
            });
        }
    } catch (error) {
        console.error("Save Post Error:", error);
        res.status(500).json({ success: false, message: "Server error while saving post" });
    }
};

export const getAllSavedPosts = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const user = await User.findById(userId).populate({
            path: "savedPosts",
            populate: [
                {
                    path: "author",
                    select: "userName profileImage"
                },
                {
                    path: "comments",
                    select: "text createdAt author",
                    populate: {
                        path: "author",
                        select: "userName profileImage"
                    }
                }
            ]
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            count: user.savedPosts.length,
            posts: user.savedPosts
        });
    } catch (error) {
        console.error("Get All Saved Posts Error:", error);
        res.status(500).json({ success: false, message: "Server error while fetching saved posts" });
    }
};