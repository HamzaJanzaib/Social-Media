import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const generateToken = async (user) => {
    const payload = { id: user._id, userName: user.userName };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
    return token;
};

export const verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            console.error("Token has expired:", error.message);
            throw new Error("Token expired");
        } else if (error instanceof jwt.JsonWebTokenError) {
            console.error("Invalid token:", error.message);
            throw new Error("Invalid token");
        } else {
            console.error("Token verification failed:", error.message);
            throw new Error("Token verification failed");
        }
    }
};