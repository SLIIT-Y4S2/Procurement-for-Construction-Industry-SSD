import { Router } from "express";
import {
  createHierarchyHandler,
  deleteHierarchyHandler,
  getHierarchyHandler,
  getHierarchyListHandler,
  updateHierarchyHandler,
} from "../controller/hierarchy.controller";

const router = Router();

router.post("/", createHierarchyHandler);

router.get("/", getHierarchyListHandler);

router.get("/:hierarchyId", getHierarchyHandler);

router.put("/:hierarchyId", updateHierarchyHandler);

router.delete("/:hierarchyId", deleteHierarchyHandler);

export default router;
