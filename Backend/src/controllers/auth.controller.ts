import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {

  static async register(req: Request, res: Response) {
    console.log("BODY:", req.body);
    try {
      const user = await AuthService.register(req.body);

      return res.status(201).json({
        message: "User registered",
        user,
      });
    } catch (err: any) {
      return res.status(400).json({
        error: err.message,
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const token = await AuthService.login(req.body);

      return res.json({
        message: "Login success",
        token,
      });
    } catch (err: any) {
      if (err.message === "INVALID_EMAIL") {
        return res.status(401).json({ message: "Invalid email" });
      }

      if (err.message === "INVALID_PASSWORD") {
        return res.status(401).json({ message: "Invalid password" });
      }

      return res.status(500).json({ error: err.message });
    }
  }
}
