import {
  requireUser,
  requireCompanyManager,
  requireProcurementStaff,
  requireSiteManager,
  requireSiteManagerOrProcurementStaffOrCompanyManager,
  requireSupplier,
} from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { Router } from "express";
const router = Router();

// order imports
import {
  getSupplierItemListHandler,
  getSupplierListHandler,
  createOrderHandler,
  getOrderListHandler,
  getPendingApprovalOrderListHandler,
  approveOrderHandler,
  declineOrderHandler,
} from "../controller/order.controller";
import {
  getSupplierItemListSchema,
  createOrderSchema,
  approveOrDeclineOrderSchema,
} from "../schema/order.schema";

// for the mobile application
//get all suppliers
router.get("/suppliers", [requireUser], getSupplierListHandler);

router.get(
  "/suppliers/:supplierId/items",
  [requireUser, validateResource(getSupplierItemListSchema)],
  getSupplierItemListHandler
);

router.post(
  "/orders",
  [
    requireSiteManagerOrProcurementStaffOrCompanyManager,
    validateResource(createOrderSchema),
  ],
  createOrderHandler
);

router.get(
  "/orders",
  [requireSiteManagerOrProcurementStaffOrCompanyManager],
  getOrderListHandler
);

// * company manager approval and decline
router.get(
  "/orders/pending-approval/company-manager",
  [requireCompanyManager],
  getPendingApprovalOrderListHandler
);

router.patch(
  "/orders/pending-approval/company-manager/:orderId/approve",
  [requireCompanyManager, validateResource(approveOrDeclineOrderSchema)],
  approveOrderHandler
);

router.patch(
  "/orders/pending-approval/company-manager/:orderId/decline",
  [requireCompanyManager, validateResource(approveOrDeclineOrderSchema)],
  declineOrderHandler
);

// todo supplier approve order

export default router;
