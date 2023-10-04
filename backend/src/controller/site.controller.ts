import { Request, Response } from "express";
import {
  CreateSiteInput,
  UpdateSiteInput,
  DeleteSiteInput,
  GetSiteInput,
  ListSiteInput,
} from "../schema/site.schema";
import logger from "../utils/logger";

import {
  createSite,
  deleteSite,
  findAndUpdateSite,
  findSite,
  listSites,
} from "../service/site.service";

export async function createSiteHandler(
  req: Request<{}, {}, CreateSiteInput["body"]>,
  res: Response
) {
  const body = req.body;
  try {
    const site = await createSite({ ...body });
    return res.send(site);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function getSiteListHandler(
  req: Request<{}, {}, {}>,
  res: Response
) {
  try {
    const sites = await listSites();
    return res.send(sites);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function getSiteHandler(
  req: Request<GetSiteInput["params"]>,
  res: Response
) {
  const siteId = req.params.siteId;
  try {
    const site = await findSite({ siteId });
    if (!site) {
      return res.sendStatus(404);
    }
    return res.send(site);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function updateSiteHandler(
  req: Request<UpdateSiteInput["params"], {}, UpdateSiteInput["body"]>,
  res: Response
) {
  const body = req.body;
  try {
    const siteId = req.params.siteId;
    const update = req.body;

    const site = await findSite({ siteId });

    if (!site) {
      return res.sendStatus(404);
    }

    const updatedSite = await findAndUpdateSite({ siteId }, update, {
      new: true,
    });

    return res.send(updatedSite);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}

export async function deleteSiteHandler(
  req: Request<DeleteSiteInput["params"]>,
  res: Response
) {
  const siteId = req.params.siteId;
  try {
    const site = await findSite({ siteId });

    if (!site) {
      return res.sendStatus(404);
    }

    const deletedSite = await deleteSite({ siteId });

    return res.send(deletedSite);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
