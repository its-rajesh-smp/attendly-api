import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import limiter from "./config/rate-limiter.conf";
import router from "./routes";
import { EnvUtil } from "./utils";

/* Config */
dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev",
});

export const app = express();

/* Middlewares */
app.use(cors({ origin: "*" }));
app.use(limiter);
app.use(express.json());

/* Routes */
app.use("/api", router);

/* Start Server */
const port = parseInt(EnvUtil.getEnv("PORT"));

app.listen(port, async () => {
  console.log(`🚀 server started on ${port}`);
});
