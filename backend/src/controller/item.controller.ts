import { Request, Response } from "express";

import { CreateItemInput, UpdateItemInput } from "../schema/item.schema";

import logger from "../utils/logger";

import {
  createItem,
  findItem,
  getItemList,
  findAndUpdateItem,
} from "../service/item.service";

export async function createItemHandler(
  req: Request<{}, {}, CreateItemInput["body"]>,
  res: Response
) {
  const body = req.body;
  try {
    const item = await createItem({ ...body });
    return res.status(201).send(item);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function getItemListHandler(
  req: Request<{}, {}, {}>,
  res: Response
) {
  try {
    const items = await getItemList();
    return res.send(items);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function updateItemHandler(
  req: Request<UpdateItemInput["params"], {}, CreateItemInput["body"]>,
  res: Response
) {
  const body = req.body;
  try {
    const itemId = req.params.itemId;
    const item = await findItem({ itemId });
    if (!item) {
      return res.sendStatus(404);
    }

    const updatedItem = await findAndUpdateItem({ itemId }, { ...body });

    return res.status(200).send(updatedItem);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
