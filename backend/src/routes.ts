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
//todo remove this
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schema/product.schema";
import {
  createProductHandler,
  getProductHandler,
  updateProductHandler,
} from "./controller/product.controller";

import userManagementRoutes from "./routes/user-management.routes";
import itemRoutes from "./routes/item.routes";
import siteRoutes from "./routes/site.routes";
import orderRoutes from "./routes/order.routes";
import hierarchyRoutes from "./routes/hierarchy.routes";

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

  // todo remove product routes
  app.post(
    "/api/products",
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );

  app.put(
    "/api/products/:productId",
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );

  app.get(
    "/api/products/:productId",
    validateResource(getProductSchema),
    getProductHandler
  );

  app.delete(
    "/api/products/:productId",
    [requireUser, validateResource(deleteProductSchema)],
    getProductHandler
  );
}

export default routes;
