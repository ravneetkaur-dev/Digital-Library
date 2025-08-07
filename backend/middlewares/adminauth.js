import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const adminAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access: Token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden: Admins only" });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error("Admin auth error:", error);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
};
