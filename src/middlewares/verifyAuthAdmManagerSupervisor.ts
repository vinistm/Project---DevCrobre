import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

const verifyAuthAdmManagerSupervisor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const position = req.user.position;

  if (position === "ADM" || "manager" || "supervisor") {
    next();
  } else {
    throw new AppError(401, "Missing permissions!");
  }
};
export default verifyAuthAdmManagerSupervisor;
