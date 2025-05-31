# 🌐 MERN Stack Social Media App

A powerful full-stack **social media platform** built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). Includes features like user registration with OTP, real-time chat, media posts, follow system, and more.

---

## 🚀 Features

- 🔐 User Authentication (Register / Login / Logout)
- 🔑 Forgot Password with OTP & Secure Reset
- ✅ OTP Verification for Extra Security
- 👤 User Profile Management (Edit profile, gender, bio, profile image)
- 📄 Upload Images to Cloudinary via Multer
- 📸 Create Posts (with optional image & caption)
- ❤️ Like / 💬 Comment on Posts
- ➕ Follow / Unfollow other users
- 🫂 Friend System (toggle-based)
- 📂 Save posts for later
- 💬 Real-time Messaging System (Conversations & Messages)
- 🧠 Suggested Users API
- 🛡️ JWT Authentication using HTTP-only Cookies
- 📁 Clean MVC Structure for Scalability

---

## 📁 Project Structure

```
root/
│
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── postController.js
│   │   ├── messageController.js
│   │   └── ...
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   ├── Comment.js
│   │   ├── Message.js
│   │   ├── Conversation.js
│   │   └── ...
│   │
│   ├── routes/
│   │   ├── auth.Route.js
│   │   ├── post.Route.js
│   │   ├── message.Route.js
│   │   └── ...
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── validationMiddleware.js
│   │   └── ...
│   │
│   ├── utils/
│   │   ├── sendMail.js
│   │   ├── WelcomeEmail.js
│   │   ├── ForgetPasswordEmail.js
│   │   └── ...
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── uploads/
│   │   └── (multer temp uploads)
│   │
│   └── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Tech Stack

**Frontend:** React.js  
**Backend:** Node.js, Express.js  
**Database:** MongoDB with Mongoose  
**Authentication:** JWT + Cookies  
**Email:** Nodemailer  
**File Uploads:** Multer + Cloudinary  
**Other Tools:** bcrypt, dotenv, cookie-parser

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/HamzaJanzaib/Social-Media.git
cd social-media
```

### 2. Install Dependencies

```bash
npm install || npm i
```

### 3. Environment Configuration

Create a `.env` file in the root:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Start the Server

```bash
npm run dev || npm start
```

> API will run on `http://localhost:8080`.

---

## 📬 Backend API Endpoints

### 🔐 Auth Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/logout`
- `POST /api/auth/forgot-password`
- `POST /api/auth/verify-otp`
- `POST /api/auth/reset-password`

### 👤 Profile Routes

- `GET /api/profile` — Get logged-in user profile
- `PUT /api/profile/edit` — Update user profile
- `GET /api/profile/suggest-users` — Get suggested users

### 📝 Post Routes

- `POST /api/posts` — Create new post
- `GET /api/posts/:id` — Get a single post
- `DELETE /api/posts/:id` — Delete a post

### ❤️ Like & 💬 Comment Routes

- `POST /api/posts/:id/like` — Like or Unlike a post
- `POST /api/posts/:id/comment` — Comment on a post

### ➕ Follow / Unfollow

- `PUT /api/follow/:id` — Toggle follow/unfollow a user

### 🫂 Friend / Follow System

- `PUT /api/friends/:id` — Toggle follow/unfollow logic
- `GET /api/friends/following` — Get users the current user is following
- `GET /api/friends/followers` — Get users following the current user

### 💬 Messaging Routes

- `POST /api/conversations` — Start new conversation
- `GET /api/conversations/:userId` — Get user's conversations
- `POST /api/messages` — Send message
- `GET /api/messages/:conversationId` — Get all messages in a conversation

---

## 🧪 Sample .gitignore

```
node_modules/
.env
uploads/
```

---

## 📄 License

This project is licensed under the ISC License.

---

## 🧑‍💻 Author

**Hamza Janzaib**  
[GitHub](https://github.com/HamzaJanzaib) • [LinkedIn](https://www.linkedin.com/in/hamza-janzaib-6a6870318)