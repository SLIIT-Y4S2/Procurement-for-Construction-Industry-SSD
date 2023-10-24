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

// for supplier to view their orders
export async function getOrdersForSupplierHandler(
  req: Request<{}, {}, {}>,
  res: Response
) {
  try {
    const supplierId = res.locals.user._id;
    const orders = await getOrderList(
      { status: "placed", supplier: supplierId },
      true
    );
    return res.send(orders);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function getOrdersHistoryForSupplierHandler(
  req: Request<{}, {}, {}>,
  res: Response
) {
  try {
    const supplierId = res.locals.user._id;
    const orders = await getOrderList(
      {
        status: {
          $in: ["draft", "pending", "approved", "declined", "placed"],
        },
        supplier: supplierId,
      },
      true
    );
    return res.send(orders);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
