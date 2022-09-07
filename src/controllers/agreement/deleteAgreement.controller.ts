import { Request, Response } from "express";
import agreementDeleteService from "../../services/agreement/deleteAgreement.service";

const deleteAgreementController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await agreementDeleteService(id);
  return res.status(200).json({ message: "Agreement deleted with sucess!" });
};

export default deleteAgreementController;
