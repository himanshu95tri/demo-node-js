import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import {authenticateUser} from "../utils/auth/checkToken";
const router = Router();

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);

export default router;