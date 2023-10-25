import validateResource from "../middleware/validateResource";
import { Router } from "express";
const router = Router();
import {
  createDeliverySchema,
  getOrdersForSupplierSchema,
} from "../schema/order-for-supplier.schema";
import {
  getOrdersForSupplierHandler,
  getOrdersHistoryForSupplierHandler,
  createDeliveryHandler,
  getDeliveryListForSupplierHandler,
} from "../controller/order-for-supplier.controller";
import { get } from "lodash";

// todo supplier view their orders -- only show approved-order and  for supplier
router.get(
  "/orders",
  [validateResource(getOrdersForSupplierSchema)],
  getOrdersForSupplierHandler
);

router.get(
  "/orders/history",
  [validateResource(getOrdersForSupplierSchema)],
  getOrdersHistoryForSupplierHandler
);

router.post(
  "/orders/:purchaseOrderId/deliver",
  validateResource(createDeliverySchema),
  createDeliveryHandler
);

router.get("/orders/goodsReceipts", getDeliveryListForSupplierHandler);

export default router;
