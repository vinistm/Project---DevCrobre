import { Request, Response } from "express";
import listUserDebtsService from "../../services/userDebt/listUserDebts.service";
import { instanceToPlain } from "class-transformer";

const listUserDebtsController = async (req: Request, res: Response) => {
  const id = req.user.id;
  const listDebts = await listUserDebtsService(id);
  return res.status(200).json(instanceToPlain(listDebts));
};

export default listUserDebtsController;
