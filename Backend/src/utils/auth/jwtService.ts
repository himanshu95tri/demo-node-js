import jwt from "jsonwebtoken";
const env = process.env.NODE_ENV || "local";
const config = require("../../config/default.json")[env];

export const generateToken = (payload: any): string | null => {
    try {
        return jwt.sign(payload, config.jwtSecret, { expiresIn: "365d" }); // Token valid for 5 minutes
    } catch (error) {
        console.error("Token generation failed:", error);
        return null;
    }
};

export const verifyToken = (token: string): any | null => {
    try {
        return jwt.verify(token, config.jwtSecret);
    } catch (error) {
        console.error("Invalid Token:", error);
        return null;
    }
};
