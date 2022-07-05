import { Router } from "express";
import { createEvents, getEvents, getSum } from "../controllers/financialController.js";

const financialRouter = Router();

financialRouter.post("/financial-events", createEvents);

financialRouter.get("/financial-events", getEvents);

financialRouter.get("/financial-events/sum", getSum);

export default financialRouter;
