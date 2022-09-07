import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

const verifyAuthManagerSupervisor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const position = req.user.position;

  if (position === "supervisor" || "manager") {
    next();
  } else {
    throw new AppError(401, "Missing permissions!");
  }
};
export default verifyAuthManagerSupervisor;
