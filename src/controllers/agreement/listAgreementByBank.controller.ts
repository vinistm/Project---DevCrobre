import { Request, Response } from "express";
import listAgreementByBankService from "../../services/agreement/listAgreementByBank.service";

const listAgreementByBankController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const agreements = await listAgreementByBankService(id);
  return res.status(200).json(agreements);
};

export default listAgreementByBankController;
