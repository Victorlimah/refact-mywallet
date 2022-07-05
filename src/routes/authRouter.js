import { Router } from "express";
import { validateSchemas } from "../utils/validateSchemas.js";
import { login, register } from "../controllers/authController.js";
import { registerSchema, loginSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/sign-in", validateSchemas(loginSchema), login);
authRouter.post("/sign-up", validateSchemas(registerSchema), register);

export default authRouter;