import { Router } from "express";
import { validateSchemas } from "../utils/validateSchemas.js";
import { newFinancialSchema } from "../schemas/financialSchema.js";
import * as controller from "../controllers/financialController.js";

const financialRouter = Router();

financialRouter.post("/financial-events", validateSchemas(newFinancialSchema), controller.createEvents);

financialRouter.get("/financial-events", controller.getEvents);

financialRouter.get("/financial-events/sum", controller.getSum);

export default financialRouter;
