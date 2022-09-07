import { Request, Response } from "express";
import listOneDebtService from "../../services/debts/listOneDebt.service";

const listOneDebtController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const debt = await listOneDebtService(id);

  return res.status(200).json(debt);
};
export default listOneDebtController;
