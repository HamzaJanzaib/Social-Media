import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import cloudinary from "../lib/Cloudinary.js";
import sharp from "sharp";
import fs from "fs";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.user.id;
        const receiverId = req.params.receiverId;
        const { content } = req.body;

        if (!receiverId) {
            return res.status(400).json({ success: false, message: "Receiver ID is required" });
        }

        let conversation = await Conversation.find({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        };

        const messageData = {
            sender: senderId,
            receiver: receiverId,
            content
        };
        if (req.file) {
            const inputPath = req.file.path;
            const outputPath = `uploads/optimized-${Date.now()}.jpeg`;

            await sharp(inputPath)
                .resize(800, 800, { fit: "inside" })
                .toFormat("jpeg", { quality: 80 })
                .toFile(outputPath);

            const result = await cloudinary.uploader.upload(outputPath, {
                folder: "social/posts",
                use_filename: true,
                unique_filename: false,
            });

            messageData.image = result.secure_url;

            // Cleanup temp files
            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);
        }

        const message = new Message(messageData);

        if (message) {
            conversation.messages.push(message._id);
        }
        await Promise.all([message.save(), conversation.save()]);

        //implement socket io for real time

        res.status(201).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
        console.error("Send Message Error:", error);
        res.status(500).json({ success: false, message: "Server error while sending message" });
    }
}

export const getMessages = async (req, res) => {
    try {

        const senderId = req.user.id;
        const receiverId = req.params.receiverId;

        const conversation = await Conversation.find({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            return res.status(400).json({ success: false, message: [] });
        }

        res.status(200).json({ success: true, messages : conversation?.messages });
    } catch (error) {
        console.error("Get Messages Error:", error);
        res.status(500).json({ success: false, message: "Server error while fetching messages" });
    }
};