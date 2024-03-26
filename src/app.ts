import express, { Request, Response } from "express";
import errorHandler from "./middlewares/errorHandler";
import initializeMorganMiddleware from "./middlewares/morganMiddleware";
import cors from "cors";
import router from "./routes/index";

const app = express();

function bootstrapApplication() {
  app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(initializeMorganMiddleware());

  app.all("/", (req: Request, res: Response) => {
    res.json({ message: "App is running" });
  });
  
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.json({ message: "App is running" });
  });
  app.use("/v1", router);

  app.use(errorHandler);
  return app;
}

export default bootstrapApplication;
