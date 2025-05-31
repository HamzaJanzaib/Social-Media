import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER_GMAIL,
    pass: process.env.EMAIL_PASS_GMAIL,
  },
});

// Wrap in an async IIFE so we can use await.
const sendMail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: 'Social - Hamza Janzaib', 
      to,
      subject,
      text,
      html,
    });
    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendMail;


