import { Request, Response } from "express";
import {
  CreateHierarchyInput,
  DeleteHierarchyInput,
  GetHierarchyInput,
  UpdateHierarchyInput,
} from "../schema/hierarchy.schema";
import {
  createHierarchy,
  deleteHierarchy,
  getAllHierarchies,
  getHierarchy,
  updateHierarchy,
} from "../service/hierarchy.service";
import logger from "../utils/logger";

export async function createHierarchyHandler(
  req: Request<{}, {}, CreateHierarchyInput["body"]>,
  res: Response
) {
  try {
    const hierarchy = await createHierarchy(req.body);

    return res.status(201).send(hierarchy);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getHierarchyListHandler(
  req: Request<{}, {}, {}>,
  res: Response
) {
  try {
    const sites = await getAllHierarchies();
    return res.send(sites);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function getHierarchyHandler(
  req: Request<GetHierarchyInput["params"]>,
  res: Response
) {
  const hierarchyId = req.params.hierarchyId;
  try {
    const hierarchy = await getHierarchy(hierarchyId);
    if (!hierarchy) {
      return res.sendStatus(404);
    }
    return res.status(200).send(hierarchy);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function updateHierarchyHandler(
  req: Request<
    UpdateHierarchyInput["params"],
    {},
    UpdateHierarchyInput["body"]
  >,
  res: Response
) {
  try {
    const hierarchyId = req.params.hierarchyId;
    const update = req.body;
    const hierarchy = await getHierarchy(hierarchyId);

    if (!hierarchy) {
      return res.sendStatus(404);
    }

    const updatedHierarchy = await updateHierarchy(hierarchyId, update);

    return res.status(200).send(updatedHierarchy);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function deleteHierarchyHandler(
  req: Request<DeleteHierarchyInput["params"]>,
  res: Response
) {
  const hierarchyId = req.params.hierarchyId;
  try {
    const hierarchy = await getHierarchy(hierarchyId);

    if (!hierarchy) {
      return res.sendStatus(404);
    }

    const deletedHierarchy = await deleteHierarchy(hierarchyId);

    return res.send(deletedHierarchy);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
