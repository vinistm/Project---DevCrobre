import { Request, Response } from "express";
import listOneBankService from "../../services/bank/listOneBank.service";

const listOneBankController = async (req: Request, res: Response) => {
  const id = req.params.id;

  //   const idString = document.toString();
  const client = await listOneBankService(id);

  return res.status(200).send(client);
};

export default listOneBankController;
