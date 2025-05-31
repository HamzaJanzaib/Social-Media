// models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        caption: {
            type: String,
        },
        image: {
            type: String,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment", // You can create a Comment schema later
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("Post", postSchema);
