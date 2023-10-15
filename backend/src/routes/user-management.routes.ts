import {
  requireUser,
  requireCompanyManager,
  requireProcurementStaff,
  requireSiteManager,
  requireSiteManagerOrProcurementStaffOrCompanyManager,
  requireSupplier,
} from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";

import {
  getUserListHandler,
  createUserHandler,
  updateUserHandler,
} from "../controller/user-management.controller";
import {
  listUserSchema,
  createUserSchema,
  updateUserSchema,
} from "../schema/user-management.schema";

import { Router } from "express";
const router = Router();

router.get(
  "/",
  [requireCompanyManager, validateResource(listUserSchema)],
  getUserListHandler
);

//create a user
router.post(
  "/",
  [requireCompanyManager, validateResource(createUserSchema)],
  createUserHandler
);

//update a user
router.put(
  "/:userId",
  [requireCompanyManager, validateResource(updateUserSchema)],
  updateUserHandler
);

export default router;
