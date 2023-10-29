import { Request, Response } from "express";
import logger from "../utils/logger";

import { getDeliveryList, findDelivery } from "../service/deliver.service";
import { GoodReceiptDocument } from "../models/goods-receipts.models";
import { MarkDeliveryAsReceivedInput } from "../schema/deliveries-for-site-manager.schema";

// for site manager to view their deliveries
export async function getDeliveriesForSiteManagerHandler(
  req: Request<{}, {}, {}>,
  res: Response
) {
  try {
    const siteManagerId = res.locals.user._id;
    const deliveries = await getDeliveryList({
      siteManager: siteManagerId,
    });
    return res.send(deliveries);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

// for site manager to update the delivery status
export async function markDeliveryAsReceivedHandler(
  req: Request<MarkDeliveryAsReceivedInput["params"], {}, {}>,
  res: Response
) {
  try {
    const delivery: GoodReceiptDocument | null = await findDelivery(
      { goodReceiptId: req.params.deliveryId },
      { lean: false }
    );
    if (!delivery) {
      return res.status(401).send("Delivery not found");
    }
    if (delivery.status !== "pending-shipping") {
      return res.status(409).send("Delivery not in approved status");
    }
    delivery.status = "received";
    const updatedDelivery = await delivery.save();

    //find all the deliveries with the order id
    const deliveries = await getDeliveryList({
      order: delivery.order,
      lean: false,
    });
    //if all the deliveries are received, then change the order status to received
    if (
      deliveries.every((delivery) => delivery.status === "received") &&
      delivery.order.status !== "received"
    ) {
      delivery.order.status = "received";
      await delivery.order.save();
    }
    return res.send(updatedDelivery);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
