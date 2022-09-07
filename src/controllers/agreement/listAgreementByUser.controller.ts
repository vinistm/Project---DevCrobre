import { Request, Response } from "express";
import listAgreementByUserService from "../../services/agreement/listAgreementByUser.service";

const listAgreementByUserController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const agreements = await listAgreementByUserService(id);
  return res.status(200).json(agreements);
};

export default listAgreementByUserController;
