import { Request, Response } from "express";
import createAgreementService from "../../services/agreement/createAgreement.service";

const createAgreementController = async (req: Request, res: Response) => {
  const id = req.user.id;
  const {
    agreedValue,
    dateAgree,
    status,
    debts,
    bank,
    client,
    formOfPayment,
    installments,
    valueEntry,
  } = req.body;

  const newAgreement = await createAgreementService({
    agreedValue,
    dateAgree,
    status,
    debts,
    bank,
    client,
    id,
    formOfPayment,
    installments,
    valueEntry,
  });

  return res.status(201).json(newAgreement);
};

export default createAgreementController;
