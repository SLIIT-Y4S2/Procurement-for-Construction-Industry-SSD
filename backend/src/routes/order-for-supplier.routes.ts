import validateResource from "../middleware/validateResource";
import { Router } from "express";
const router = Router();
import { getOrdersForSupplierSchema } from "../schema/order-for-supplier.schema";
import {
  getOrdersForSupplierHandler,
  getOrdersHistoryForSupplierHandler,
} from "../controller/order-for-supplier.controller";

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

export default router;
