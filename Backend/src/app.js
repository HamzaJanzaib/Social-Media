import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dBconnect from './config/ConnectDB.js';
import ConnectCloudinary from './lib/Cloudinary.js';


dotenv.config();

const app = express();

// Import And Call DB function
dBconnect(process.env.MONGO_URI);
// -------------- Import And Call DB function end

// Import And Call Cloudinary function
ConnectCloudinary();
// -------------- Import And Call Cloudinary function end

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
// app.use("/api/user", AuthRouter);
// -------------- Routes end

export default app;