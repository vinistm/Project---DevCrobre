import { Request, Response } from "express";
import updateBankInfoService from "../../services/bank/updateBankInfo.service";

const updateBankInfoController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { idContact } = req.params;
  const data = req.body;

  await updateBankInfoService(id, idContact, data);

  return res.status(200).json({
    message: "Bank Contact updated sucess!",
  });
};

export default updateBankInfoController;
