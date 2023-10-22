import { Request, Response } from "express";
import { CreateHierarchyInput } from "../schema/hierarchy.schema";
import { createHierarchy, getHierarchy } from "../service/hierarchy.service";
import logger from "../utils/logger";

// export async function getHierarchyHandler(
//   req: Request<{}, {}, {}>,
//   res: Response
// ) {
//   try {
//     const hierarchy = await getHierarchy(req.);

//     return res.send(hierarchy);
//   } catch (e: any) {
//     logger.error(e);
//     return res.status(201).send(e.message);
//   }
// }

export async function createHierarchyHandler(
  req: Request<{}, {}, CreateHierarchyInput["body"]>,
  res: Response
) {
  try {
    const hierarchy = await createHierarchy(req.body);

    return res.send(hierarchy);
  } catch (e: any) {
    logger.error(e);
    return res.status(201).send(e.message);
  }
}
