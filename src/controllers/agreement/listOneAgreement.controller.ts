import { Request, Response } from "express";
import listOneAgreementService from "../../services/agreement/listOneAgreement.service";

const listOneAgreementController = async (req: Request, res: Response) => {
    const id = req.params.id;

  const agreement = await listOneAgreementService(id);
  return res.status(200).json(agreement);
};

export default listOneAgreementController;
