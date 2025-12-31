import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./jwtService";

export const authenticateUser = (req: any, res: any, next: NextFunction) => {
    
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Bearer header

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided", status: 401, });
    }

    try {
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized: Invalid token", status: 401, });
        }

        req.user = decoded; // Attach decoded user info to request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Token verification failed", status: 401, });
    }
};
