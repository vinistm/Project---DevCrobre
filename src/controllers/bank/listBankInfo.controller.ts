import { Request, Response } from "express";
import listBankInfoService from "../../services/bank/listBankInfo.service";

const listBankInfoController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const banks = await listBankInfoService(id);

  return res.status(200).json(banks);
};

export default listBankInfoController;
