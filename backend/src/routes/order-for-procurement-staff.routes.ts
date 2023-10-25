import validateResource from "../middleware/validateResource";
import { Router } from "express";
const router = Router();
import {
  getOrdersForProcurementStaffSchema,
  placeOrderSchema,
} from "../schema/order-for-procurement-staff.schema";
import {
  getOrdersForProcurementStaffHandler,
  placeOrderForProcurementStaffHandler,
} from "../controller/order-for-procurement-staff.controller";

// todo supplier view their orders -- only show approved-order and  for supplier
router.get(
  "/orders",
  [validateResource(getOrdersForProcurementStaffSchema)],
  getOrdersForProcurementStaffHandler
);
router.patch(
  "/order/:orderId/place",
  [validateResource(placeOrderSchema)],
  placeOrderForProcurementStaffHandler
);

export default router;
