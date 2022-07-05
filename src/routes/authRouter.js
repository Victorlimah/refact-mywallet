import { Router } from "express";
import { register } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/sign-up", register);

authRouter.post("/sign-in", );

export default authRouter;