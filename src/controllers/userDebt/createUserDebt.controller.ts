import { Request, Response } from "express";
import createUserDebtService from "../../services/userDebt/createUserDebt.service";

const createUserDebtController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { debts } = req.body;

  const bankInfo = await createUserDebtService(userId, debts);

  return res.status(200).json(bankInfo);
};

export default createUserDebtController;
