import { Request, Response } from "express";
import createClientService from "../../services/client/createClient.service";

const createClientController = async (req: Request, res: Response) => {
  const { document, name, type } = req.body;

  const newClient = await createClientService({ document, name, type });

  return res.status(201).json(newClient);
};

export default createClientController;
