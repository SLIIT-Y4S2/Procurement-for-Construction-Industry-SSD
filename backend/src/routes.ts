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
  requireSiteManger,
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
// site imports
import {
  createSiteSchema,
  listSiteSchema,
  getSiteSchema,
  deleteSiteSchema,
  updateSiteSchema,
} from "./schema/site.schema";
import {
  createSiteHandler,
  getSiteListHandler,
  getSiteHandler,
  updateSiteHandler,
  deleteSiteHandler,
} from "./controller/site.controller";
// user management imports
import {
  getUserListHandler,
  createUserHandler,
  updateUserHandler,
} from "./controller/user-management.controller";
import {
  listUserSchema,
  createUserSchema,
  updateUserSchema,
} from "./schema/user-management.schema";
// item imports
import {
  createItemSchema,
  getItemListSchema,
  deleteItemSchema,
  updateItemSchema,
  getItemSchema,
} from "./schema/item.schema";
import {
  createItemHandler,
  getItemListHandler,
  updateItemHandler,
} from "./controller/item.controller";
// order imports
import {
  getSupplierItemListHandler,
  getSupplierListHandler,
} from "./controller/order.controller";
import { get } from "lodash";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  // login router
  app.post(
    "/api/login",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  // get the user's sessions
  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  //

  //

  //

  //

  // TODO: user-management routes here
  //get all users
  app.get(
    "/api/user-management",
    [requireCompanyManager, validateResource(listUserSchema)],
    getUserListHandler
  );

  //create a user
  app.post(
    "/api/user-management",
    [requireCompanyManager, validateResource(createUserSchema)],
    createUserHandler
  );

  //update a user
  app.put(
    "/api/user-management/:userId",
    [requireCompanyManager, validateResource(updateUserSchema)],
    updateUserHandler
  );

  //

  //

  //

  //

  //TODO: add site routes here

  app.post(
    "/api/sites",
    [requireProcurementStaff, validateResource(createSiteSchema)],
    createSiteHandler
  );
  app.get(
    "/api/sites",
    [requireUser, validateResource(listSiteSchema)],
    getSiteListHandler
  );
  app.get(
    "/api/sites/:siteId",
    [requireUser, validateResource(getSiteSchema)],
    getSiteHandler
  );
  app.put(
    "/api/sites/:siteId",
    [requireProcurementStaff, validateResource(updateSiteSchema)],
    updateSiteHandler
  );
  app.delete(
    "/api/sites/:siteId",
    [requireProcurementStaff, validateResource(deleteSiteSchema)],
    deleteSiteHandler
  );

  //

  //

  //

  //
  // todo  item routes

  app.post(
    "/api/items",
    [requireProcurementStaff, validateResource(createItemSchema)],
    createItemHandler
  );

  app.get(
    "/api/items",
    [requireUser, validateResource(getItemListSchema)],
    getItemListHandler
  );

  app.put(
    "/api/items/:itemId",
    [requireProcurementStaff, validateResource(updateItemSchema)],
    updateItemHandler
  );

  //

  //

  //

  //
  // todo  order related routes

  //get all suppliers
  app.get("/api/suppliers", [requireUser], getSupplierListHandler);

  //get all items of a supplier
  app.get(
    "/api/suppliers/:supplierId/items",
    [requireUser],
    getSupplierItemListHandler
  );

  // todo remove product routes

  //

  //

  //

  //

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
