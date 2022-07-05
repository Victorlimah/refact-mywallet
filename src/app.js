import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import router from "./routes/index.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);



export default app;
