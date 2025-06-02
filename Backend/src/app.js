import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dBconnect from './config/ConnectDB.js';
import AuthRouter from "./routes/authRoutes.js"
import MessageRouter from "./routes/messagesRoutes.js"
import PostRouter from "./routes/postRoutes.js"


dotenv.config();

const app = express();

// Import And Call DB function
dBconnect(process.env.MONGO_URI);
// -------------- Import And Call DB function end


// CORS configuration
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Expires", "Pragma"],
    credentials: true
}));
// -------------- CORS config end

// Basic HTTP Data transfer
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// -------------- Basic HTTP Data transfer end

// Cookie parser configuration
app.use(cookieParser());
// -------------- CookieParser end

// Routes
app.use("/api/auth", AuthRouter);
app.use("/api/message", MessageRouter);
app.use("/api/post", PostRouter);
// -------------- Routes end

export default app;