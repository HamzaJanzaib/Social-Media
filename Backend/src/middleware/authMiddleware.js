import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: decoded.id,
            userName: decoded.userName,
        };

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};

