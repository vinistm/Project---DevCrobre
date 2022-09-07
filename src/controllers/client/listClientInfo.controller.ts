import { Request, Response } from "express";
import listClientInfoService from "../../services/client/listClientInfo.service";

const listClientInfoController = async (req: Request, res: Response) => {
  const documents = req.params.document;

  const infosClient = await listClientInfoService(documents);

  return res.status(200).json(infosClient);
};

export default listClientInfoController;
