# 🌐 MERN Stack Social Media App

A robust full-stack **social media platform** built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). This project features secure authentication, real-time messaging, media uploads, a follow/friend system, and a scalable codebase.

---

## 📦 package.json Overview

The `package.json` manages dependencies, scripts, and metadata for the backend. Key sections include:

- **Scripts:**  
    - `start`: Launches the server  
    - `dev`: Runs the server with nodemon for hot-reloading  
- **Dependencies:**  
    - `express`, `mongoose`, `bcrypt`, `jsonwebtoken`, `cookie-parser`, `dotenv`, `multer`, `cloudinary`, `nodemailer`, etc.
- **DevDependencies:**  
    - `nodemon` for development

---

## 📁 Project Structure

```
root/
│
├── src/
│   ├── controllers/         # Route logic (auth, posts, messages, etc.)
│   ├── models/              # Mongoose schemas (User, Post, Comment, etc.)
│   ├── routes/              # Express route definitions
│   ├── middlewares/         # Auth, validation, error handling
│   ├── utils/               # Helper functions (email, OTP, etc.)
│   ├── config/              # Database and service configs
│   ├── uploads/             # Temporary file uploads (Multer)
│   ├── app.js               # Express app setup
│   └── server.js            # Entry point
│
├── .env                     # Environment variables
├── .gitignore               # Ignored files/folders
├── package.json             # Project metadata & dependencies
└── README.md
```

---

## 🛣️ All Routes & Endpoints

### 🔐 Auth (`/api/auth`)
- `POST /register` — Register user (with OTP email)
- `POST /login` — Login user
- `GET /logout` — Logout user (clear cookie)
- `POST /forgot-password` — Send OTP for password reset
- `POST /verify-otp` — Verify OTP for registration/reset
- `POST /reset-password` — Reset password with OTP

### 👤 Profile (`/api/profile`)
- `GET /` — Get current user profile
- `PUT /edit` — Update profile (bio, gender, image, etc.)
- `GET /suggest-users` — Suggested users to follow

### 📝 Posts (`/api/posts`)
- `POST /` — Create post (image/caption)
- `GET /:id` — Get single post
- `DELETE /:id` — Delete post

### ❤️ Likes & 💬 Comments (`/api/posts/:id`)
- `POST /like` — Like/unlike post
- `POST /comment` — Add comment

### ➕ Follow System
- `PUT /api/follow/:id` — Follow/unfollow user

### 🫂 Friends (`/api/friends`)
- `PUT /:id` — Toggle friend/follow
- `GET /following` — List following
- `GET /followers` — List followers

### 💬 Messaging
- `POST /api/conversations` — Start conversation
- `GET /api/conversations/:userId` — Get conversations
- `POST /api/messages` — Send message
- `GET /api/messages/:conversationId` — Get messages

---

## ✨ Key Functionalities

- **User Registration & OTP Verification:**  
    Secure sign-up with email OTP, password hashing, and JWT cookies.

- **Profile Management:**  
    Edit profile, upload avatar, manage bio/gender.

- **Media Posts:**  
    Create posts with images (Cloudinary via Multer), like/comment, and delete.

- **Follow & Friend System:**  
    Follow/unfollow users, friend toggling, suggested users, followers/following lists.

- **Real-Time Messaging:**  
    Start conversations, send/receive messages, all via REST endpoints.

- **Security:**  
    JWT authentication (HTTP-only cookies), password hashing, input validation.

- **Email Integration:**  
    Nodemailer for OTP and password reset emails.

- **Scalable Structure:**  
    MVC pattern, modular controllers/routes, environment configs.

---

## ⚙️ Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT + Cookies
- **Email:** Nodemailer
- **File Uploads:** Multer + Cloudinary
- **Other:** bcrypt, dotenv, cookie-parser

---

## 🚀 Getting Started

1. **Clone the Repository**
     ```bash
     git clone https://github.com/HamzaJanzaib/Social-Media.git
     cd Social-Media
     ```

2. **Install Dependencies**
     ```bash
     npm install
     ```

3. **Configure Environment**
     Create a `.env` file:
     ```
     PORT=8080
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     ```

4. **Run the Server**
     ```bash
     npm run dev
     ```
     API runs at `http://localhost:8080`.

---

## 🧪 .gitignore Example

```
node_modules/
.env
uploads/
```

---

## 📄 License

Licensed under the ISC License.

---

## 👤 Author

**Hamza Janzaib**  
[GitHub](https://github.com/HamzaJanzaib) • [LinkedIn](https://www.linkedin.com/in/hamza-janzaib-6a6870318)
