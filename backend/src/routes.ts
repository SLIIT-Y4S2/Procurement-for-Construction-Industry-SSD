import { Express, Request, Response } from "express";
import validateResource from "./middleware/validateResource";
// user imports
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controller/session.controller";
// import { createUserHandler } from "./controller/user.controller";
import { createSessionSchema } from "./schema/session.schema";
// import { createUserSchema } from "./schema/user.schema";
import {
  requireUser,
  requireCompanyManager,
  requireProcurementStaff,
  requireSiteManager,
  requireSiteManagerOrProcurementStaffOrCompanyManager,
  requireSupplier,
} from "./middleware/requireUser";

import userManagementRoutes from "./routes/user-management.routes";
import itemRoutes from "./routes/item.routes";
import siteRoutes from "./routes/site.routes";
import orderRoutes from "./routes/order.routes";
import hierarchyRoutes from "./routes/hierarchy.routes";
import supplierRoutes from "./routes/order-for-supplier.routes";
import procurementStaffRoutes from "./routes/order-for-procurement-staff.routes";
import siteManagerDeliveryRoute from "./routes/deliveries-for-site-manager.routes";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post(
    "/api/login",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionsHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.use("/api/user-management", userManagementRoutes);
  app.use("/api/items", itemRoutes);
  app.use("/api/sites", siteRoutes);
  app.use("/api", orderRoutes);
  app.use("/api/hierarchies", hierarchyRoutes);
  app.use("/api/supplier", requireSupplier, supplierRoutes);
  app.use(
    "/api/procurement-staff",
    requireProcurementStaff,
    procurementStaffRoutes
  );
  app.use("/api/site-manager", requireSiteManager, siteManagerDeliveryRoute);
}

export default routes;
