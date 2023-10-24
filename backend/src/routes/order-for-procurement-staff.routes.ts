import { requireProcurementStaff } from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { Router } from "express";
const router = Router();
import { getOrdersForProcurementStaffSchema } from "../schema/order-for-procurement-staff.schema";
import { getOrdersForProcurementStaffHandler } from "../controller/order-for-procurement-staff.controller";

// todo supplier view their orders -- only show approved-order and  for supplier
router.get(
  "/orders",
  [validateResource(getOrdersForProcurementStaffSchema)],
  getOrdersForProcurementStaffHandler
);

export default router;
