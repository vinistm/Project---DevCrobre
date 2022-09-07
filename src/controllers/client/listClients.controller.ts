import { Request, Response } from "express";
import listClientsService from "../../services/client/listClients.service";

const listClientsController = async (req: Request, res: Response) => {
  const clients = await listClientsService();

  return res.status(200).json(clients);
};

export default listClientsController;
