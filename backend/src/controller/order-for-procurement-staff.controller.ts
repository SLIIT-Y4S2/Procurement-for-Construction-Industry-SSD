import { Request, Response } from "express";
import logger from "../utils/logger";

import { createOrder, findOrder, getOrderList } from "../service/order.service";

// for procurement staff to view their orders
export async function getOrdersForProcurementStaffHandler(
  req: Request<{}, {}, {}>,
  res: Response
) {
  try {
    const orders = await getOrderList({ status: "approved" }, true);
    return res.send(orders);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
