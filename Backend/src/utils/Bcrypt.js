import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const saltRounds = parseInt(process.env.BCRYPT_SALT) || 10;

export const hashedPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw error;
    }
}

export const comparePassword = async (password, userPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, userPassword);
        return isMatch;
    } catch (error) {
        console.error("Error comparing passwords:", error);
        throw error;
    }
}