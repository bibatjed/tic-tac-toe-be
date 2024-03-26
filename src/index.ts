import dotenv from "dotenv";
dotenv.config();
import logger from "./logger";
import http from "http";
import mongoose from "mongoose";
import bootstrapApplication from "./app";

mongoose
  .connect(process.env.MONGO_DB_URI as string, {})
  .then(() => {
    const app = bootstrapApplication();
    const port = process.env.PORT || 3000;
    http.createServer(app).listen(port, () => {
      logger.info("Listening in port :3000");
    });
  })
  .catch((err) => {
    logger.error(`Can't start the app`, err);
  });
