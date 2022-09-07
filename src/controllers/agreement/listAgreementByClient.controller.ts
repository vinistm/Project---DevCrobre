import { Request, Response } from "express";
import listAgreementByClientService from "../../services/agreement/listAgreementByClient.service";

const listAgreementByClientController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const agreements = await listAgreementByClientService(id);
  return res.status(200).json(agreements);
};

export default listAgreementByClientController;
