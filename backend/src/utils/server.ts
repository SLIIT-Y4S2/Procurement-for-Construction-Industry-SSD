import express from "express";
import routes from "../routes";
import deserializeUser from "../middleware/deserializeUser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
function createServer() {
  dotenv.config();
  const app = express();

  app.use(express.json());

  app.use(cors());

  app.use(morgan("common"));

  app.use(deserializeUser);

  routes(app);

  return app;
}

export default createServer;
