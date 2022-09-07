import { Request, Response } from "express";
import bankDeleteService from "../../services/bank/deleteBank.service";

const deleteBankController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const idNumber = parseInt(id);

  await bankDeleteService(idNumber);

  return res.status(200).json({ message: "Bank deleted witdh sucess!" });
};

export default deleteBankController;
