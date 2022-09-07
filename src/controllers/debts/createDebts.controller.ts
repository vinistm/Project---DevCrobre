import { Request, Response } from "express";
import createDebtsService from "../../services/debts/createDebts.service";

const createDebtsController = async (req: Request, res: Response) => {
  const {
    bankId,
    dateDebt,
    debtOrigin,
    debtType,
    debtValue,
    documentClient,
    ipoc,
  } = req.body;

  const debt = await createDebtsService({
    bankId,
    dateDebt,
    debtOrigin,
    debtType,
    debtValue,
    documentClient,
    ipoc,
  });

  return res.status(201).json(debt);
};

export default createDebtsController;
