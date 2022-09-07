import { Request, Response } from "express";
import updateAgreementService from "../../services/agreement/updateAgreement.service";

const updateAgreementController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const { agreedValue, dateAgree, status } = req.body;

  await updateAgreementService({ id, agreedValue, dateAgree, status} );

  return res.status(200).json({ message: "Updated Agreement!" });
};

export default updateAgreementController;
