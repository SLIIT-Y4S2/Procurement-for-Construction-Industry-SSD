import logger from "pino";
import PinoPretty from "pino-pretty";

const log = logger(
  PinoPretty({
    colorize: true,
  })
);

export default log;
