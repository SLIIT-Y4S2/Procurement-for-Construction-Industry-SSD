import {
  CreateOrderInput,
  GetSupplierItemListInput,
  ApproveOrDeclineOrderInput,
} from "./../schema/order.schema";
import { Request, Response } from "express";
import logger from "../utils/logger";

import { listUsers } from "../service/user-management.service";
import { getItemList } from "../service/item.service";
import { createOrder, findOrder, getOrderList } from "../service/order.service";

// for mobile app to show all suppliers and their items before placing an order
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

export async function getSupplierItemListHandler(
  req: Request<GetSupplierItemListInput["params"], {}, {}>,
  res: Response
) {
  try {
    const supplier = req.params.supplierId;
    const users = await getItemList({ supplier });
    return res.send(users);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

// create an order
export async function createOrderHandler(
  req: Request<{}, {}, CreateOrderInput["body"]>,
  res: Response
) {
  try {
    const order = await createOrder(req.body);
    return res.status(201).send(order);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

// get all orders
export async function getOrderListHandler(req: Request, res: Response) {
  try {
    const order = await getOrderList({}, true);
    return res.status(200).send(order);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

// get all pending approval orders for company manager
export async function getPendingApprovalOrderListHandler(
  req: Request,
  res: Response
) {
  try {
    const order = await getOrderList({ status: "pending" }, true);
    return res.status(200).send(order);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

// approve an order by company manager
export async function approveOrderHandler(
  req: Request<ApproveOrDeclineOrderInput["params"], {}, {}>,
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
    order.status = "approved";
    const updatedOrder = await order.save();
    return res.status(200).send(updatedOrder);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

// decline an order by company manager
export async function declineOrderHandler(
  req: Request<ApproveOrDeclineOrderInput["params"], {}, {}>,
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
    order.status = "declined";
    const updatedOrder = await order.save();
    return res.status(200).send(updatedOrder);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
