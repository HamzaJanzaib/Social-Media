import express from "express"
import { protect } from './../middleware/authMiddleware';
import { getMessages, sendMessage } from "../controllers/messageController";
const router = express.Router()

router.post("/send/:receiverId" , protect , sendMessage)
router.get("/get/:receiverId" , protect , getMessages)

export default router