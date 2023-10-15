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
import {
  createItemSchema,
  getItemListSchema,
  deleteItemSchema,
  updateItemSchema,
  getItemSchema,
} from "../schema/item.schema";
import {
  createItemHandler,
  getItemListHandler,
  updateItemHandler,
} from "../controller/item.controller";

router.post(
  "/",
  [requireProcurementStaff, validateResource(createItemSchema)],
  createItemHandler
);

router.get(
  "/",
  [requireUser, validateResource(getItemListSchema)],
  getItemListHandler
);

router.put(
  "/:itemId",
  [requireProcurementStaff, validateResource(updateItemSchema)],
  updateItemHandler
);
export default router;
