import express from "express"
import { protect } from './../middleware/authMiddleware.js';
import { getMessages, sendMessage } from "../controllers/messageController.js";
const router = express.Router()

router.post("/send/:receiverId" , protect , sendMessage)
router.get("/get/:receiverId" , protect , getMessages)

export default router