import { Request, Response } from "express";
import updateBankService from "../../services/bank/updateBank.service";

const updateBankController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const idNumber = parseInt(id);

  const { name } = req.body;

  await updateBankService(idNumber, name);

  return res.status(200).json({ message: "Updated Bank!" });
};

export default updateBankController;
