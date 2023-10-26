import validateResource from "../middleware/validateResource";
import { Router } from "express";
const router = Router();
import {
  getDeliveriesForSiteManagerHandler,
  markDeliveryAsReceivedHandler,
} from "../controller/deliveries-for-site-manager.controller";
import { markDeliveryAsReceivedSchema } from "../schema/deliveries-for-site-manager.schema";

router.get("/deliveries", getDeliveriesForSiteManagerHandler);

router.patch(
  "/deliveries/:deliveryId/received",
  validateResource(markDeliveryAsReceivedSchema),
  markDeliveryAsReceivedHandler
);

export default router;
