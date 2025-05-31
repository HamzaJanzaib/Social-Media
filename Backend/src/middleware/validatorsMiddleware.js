// middleware/validatorsMiddleware.js

export const validateRegisterInput = (req, res, next) => {
  const { name, userName, email, password } = req.body;

  // Basic checks
  if (!userName || !email || !password) {
    return res.status(400).json({ message: "userName, email, and password are required." });
  }

  // userName: 3-30 chars, letters, numbers, underscores only
  const userNameRegex = /^[a-zA-Z0-9_]{3,30}$/;
  if (!userNameRegex.test(userName)) {
    return res.status(400).json({ message: "Invalid userName format." });
  }

  // email regex (simple)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  // password: min 6 chars, at least one number, one letter
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message: "Password must be minimum 6 characters, with at least one letter and one number.",
    });
  }

  // Optional: validate name length
  if (name && (name.length < 2 || name.length > 50)) {
    return res.status(400).json({ message: "Name must be between 2 and 50 characters." });
  }

  next();
};

export const validateLoginInput = (req, res, next) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: "userName/email and password are required." });
  }

  next();
};
