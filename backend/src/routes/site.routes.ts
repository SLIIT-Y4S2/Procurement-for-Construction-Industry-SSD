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

// site imports
import {
  createSiteSchema,
  listSiteSchema,
  getSiteSchema,
  deleteSiteSchema,
  updateSiteSchema,
} from "../schema/site.schema";
import {
  createSiteHandler,
  getSiteListHandler,
  getSiteHandler,
  updateSiteHandler,
  deleteSiteHandler,
} from "../controller/site.controller";

router.post(
  "/",
  [requireProcurementStaff, validateResource(createSiteSchema)],
  createSiteHandler
);
router.get(
  "/",
  [requireUser, validateResource(listSiteSchema)],
  getSiteListHandler
);
router.get(
  "/:siteId",
  [requireUser, validateResource(getSiteSchema)],
  getSiteHandler
);
router.put(
  "/:siteId",
  [requireProcurementStaff, validateResource(updateSiteSchema)],
  updateSiteHandler
);
router.delete(
  "/:siteId",
  [requireProcurementStaff, validateResource(deleteSiteSchema)],
  deleteSiteHandler
);
export default router;
