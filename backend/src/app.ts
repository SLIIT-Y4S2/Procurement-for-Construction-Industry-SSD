import Connect from "./utils/connect";
import logger from "./utils/logger";
import createServer from "./utils/server";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 5000;

const app = createServer();

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  Connect.getInstance();
  // await connect();
});
