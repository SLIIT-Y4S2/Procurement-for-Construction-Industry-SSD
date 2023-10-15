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
export const requireSiteManager = (
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

export const requireProcurementStaff = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  if (!["procurementStaff", "companyManager"].includes(user.role)) {
    return res.sendStatus(403);
  }

  return next();
};

export const requireSupplier = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  if (user.role !== "supplier") {
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

export const requireSiteManagerOrProcurementStaffOrCompanyManager = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  if (
    !["siteManager", "procurementStaff", "companyManager"].includes(user.role)
  ) {
    return res.sendStatus(403);
  }

  return next();
};
