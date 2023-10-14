import { Request, Response } from "express";
import logger from "../utils/logger";

import { listUsers } from "../service/user-management.service";

export async function getSupplierListHandler(
  req: Request<{}, {}, {}>,
  res: Response
) {
  try {
    const users = await listUsers({ role: "supplier" });
    return res.send(users);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
