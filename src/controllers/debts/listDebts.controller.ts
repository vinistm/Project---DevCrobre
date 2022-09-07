import { Request, Response } from "express";
import listDebtsService from "../../services/debts/listDebts.service";

const listDebtsController = async (req: Request, res: Response) => {
  const list = await listDebtsService();
  return res.status(200).json(list);
};
export default listDebtsController;
