import { Request, Response } from "express";
import deleteBankInfoService from "../../services/bank/deleteBankInfo.service";

const deleteBankInfoController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { idContact } = req.params;

  await deleteBankInfoService(id, idContact);

  return res
    .status(200)
    .json({ message: "Bank contact deleted witdh sucess!" });
};

export default deleteBankInfoController;
