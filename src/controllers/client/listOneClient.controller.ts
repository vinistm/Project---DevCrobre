import { Request, Response } from "express";
import listOneClientService from "../../services/client/listOneClient.service";

const listOneClientController = async (req: Request, res: Response) => {
  const document = req.params.document;

  const client = await listOneClientService(document);

  return res.status(200).send(client);
};

export default listOneClientController;
