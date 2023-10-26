import { Request, Response } from "express";
import logger from "../utils/logger";

import { createOrder, findOrder, getOrderList } from "../service/order.service";
import { PlaceOrderInput } from "../schema/order-for-procurement-staff.schema";

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

export async function placeOrderForProcurementStaffHandler(
  req: Request<PlaceOrderInput["params"], {}, { status: string }>,
  res: Response
) {
  try {
    const order = await findOrder(
      { orderId: req.params.orderId },
      { lean: false }
    );
    if (!order) {
      return res.status(404).send("Order not found");
    }
    if (order.status !== "approved") {
      return res.status(409).send("Order not in approved status");
    }
    order.status = "placed";
    const updatedOrder = await order.save();
    return res.send(updatedOrder);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
