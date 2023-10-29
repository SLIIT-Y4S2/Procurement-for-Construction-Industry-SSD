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
import { CreateDeliveryInput } from "../schema/order-for-supplier.schema";
import { createDelivery, getDeliveryList } from "../service/deliver.service";

// for supplier to view their orders
export async function getOrdersForSupplierHandler(
  req: Request<{}, {}, {}>,
  res: Response
) {
  try {
    const supplierId = res.locals.user._id;
    const orders = await getOrderList(
      {
        status: { $in: ["placed", "partially-shipped"] },
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

export async function getOrdersHistoryForSupplierHandler(
  req: Request<{}, {}, {}>,
  res: Response
) {
  try {
    const supplierId = res.locals.user._id;
    const orders = await getOrderList(
      {
        status: {
          $nin: ["draft", "pending", "approved", "declined", "placed"],
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

// for supplier to create a delivery
export async function createDeliveryHandler(
  req: Request<CreateDeliveryInput["params"], {}, CreateDeliveryInput["body"]>,
  res: Response
) {
  try {
    const supplierId = res.locals.user._id;
    const purchaseOrderId = req.params.purchaseOrderId;
    const order = await findOrder(
      {
        orderId: purchaseOrderId,
      },
      { lean: false }
    );
    if (!order) {
      return res.status(404).send("Order not found");
    }
    if (order.status !== "placed" && order.status !== "partially-shipped") {
      return res.status(409).send("Order cannot be delivered");
    }

    order.status = "partially-shipped";

    order.items.forEach((item, index) => {
      const itemInDelivery = req.body.items.find(
        (i: CreateDeliveryInput["body"]["items"][0]) =>
          i.item === item.item._id.toString()
      );

      if (itemInDelivery) {
        if (itemInDelivery.quantity > item.quantity - item.shipped) {
          throw new Error(
            "Quantity in delivery cannot be more than quantity in order"
          );
        }
        order.items[index].shipped += itemInDelivery.quantity;
      }
    });

    if (
      order.items.every((item) => item.quantity === item.shipped) &&
      order.items.length > 0
    ) {
      order.status = "shipped";
    }

    const updatedOrder = await order.save();

    await createDelivery({
      items: req.body.items,
      order: order._id,
      supplier: supplierId,
      site: order.site,
      siteManager: order.siteManager,
    });
    return res.send(updatedOrder);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

// for supplier to view their delivery list
export async function getDeliveryListForSupplierHandler(
  req: Request<{}, {}, {}>,
  res: Response
) {
  try {
    const supplierId = res.locals.user._id;
    const orders = await getDeliveryList({
      supplier: supplierId,
    });
    return res.send(orders);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
