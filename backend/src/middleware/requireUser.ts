import { Request, Response, NextFunction } from "express";

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};

export const requireProcurementStaff = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  if (user.role !== "procurementStaff") {
    return res.sendStatus(403);
  }

  return next();
};

export const requireSiteManger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  if (user.role !== "siteManager") {
    return res.sendStatus(403);
  }

  return next();
};

export const requireCompanyManager = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  if (user.role !== "companyManager") {
    return res.sendStatus(403);
  }

  return next();
};
