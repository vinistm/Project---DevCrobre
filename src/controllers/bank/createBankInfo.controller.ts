import { Request, Response } from "express";

import createBankInfoService from "../../services/bank/createInfoBank.service";

const createBankInfoController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bankInfos = { id, body: req.body };

  const bankInfo = await createBankInfoService(bankInfos);

  return res.status(200).json(bankInfo);
};

export default createBankInfoController;
