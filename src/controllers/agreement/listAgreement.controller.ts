import { Request, Response } from "express";
import listAgreementService from "../../services/agreement/listAgreement.service";

const listAgreementController = async (req: Request, res: Response) => {
  const agreements = await listAgreementService();
  return res.status(200).json(agreements);
};

export default listAgreementController;
