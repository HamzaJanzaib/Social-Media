# 🌐 MERN Stack Social Media App

A full-stack social media application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) featuring user authentication, posting, following, commenting, chatting, and more.

---

## 🚀 Features

- 🔐 User Authentication (Register / Login / Logout)
- 🔑 Forgot Password with OTP verification
- 👤 User Profile (bio, image, gender)
- 📸 Post creation with optional caption/image
- ❤️ Like & 💬 Comment system
- ➕ Follow / Unfollow users
- 💾 Save posts
- 💬 Real-time messaging (via conversations & messages models)
- 📦 JWT-based authentication with cookies
- 📁 Clean folder structure with MVC pattern

---

## 📁 Project Structure

```
root/
│
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── profileController.js
│   │   └── ...
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   ├── Comment.js
│   │   ├── Message.js
│   │   └── Conversation.js
│   │
│   ├── routes/
│   │   ├── auth.Route.js
│   │   ├── profile.Route.js
│   │   └── ...
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── validationMiddleware.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Tech Stack

**Frontend:** React.js  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose)  
**Auth:** JWT, Cookies  
**Others:** bcrypt, cookie-parser, dotenv

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/social-media-app.git
cd social-media-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
```

### 4. Run the server

```bash
npm run dev
```

> The backend will run at `http://localhost:8080`.

---

## 📬 API Endpoints (Backend)

### 🔐 Auth Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/logout`
- `POST /api/auth/forgot-password`
- `POST /api/auth/verify-otp`
- `POST /api/auth/reset-password`

### 👤 Profile

- `GET /api/profile` (requires auth)

---

## 🤝 Contributing

Feel free to fork the repo and submit a PR! All contributions are welcome.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🧑‍💻 Author

**Your Name**  
[GitHub](https://github.com/HamzaJanzaib) • [LinkedIn](https://www.linkedin.com/in/hamza-janzaib-6a6870318)

---
