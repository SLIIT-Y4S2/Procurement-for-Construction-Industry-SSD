import mongoose from "mongoose";
import logger from "./logger";
class Connect {
  private static _instance: Connect;
  private constructor() {
    mongoose
      .connect(process.env.MONGO_URI || "mongodb://localhost:27017/")
      .then(() => {
        logger.info("DB connected");
      })
      .catch((error) => {
        logger.error("Could not connect to db");
        process.exit(1);
      });
  }
  static getInstance() {
    if (this._instance == undefined) {
      this._instance = new Connect();
    }
    return this._instance;
  }
}

export default Connect;
