import { Request, Response } from "express";
import createAdmService from "../../services/adm/createAdm.service";

const createAdmController = async (req: Request, res: Response) => {
  const data = { body: req.body };
  const newAdm = await createAdmService(data);

  return res.status(201).json(newAdm);
};

export default createAdmController;
