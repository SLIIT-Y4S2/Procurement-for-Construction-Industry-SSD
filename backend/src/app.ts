import express from "express";
import connect from "./utils/connect";
import logger from "./utils/logger";
import createServer from "./utils/server";

const port = process.env.PORT || 2000;

const app = createServer();

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await connect();
});
