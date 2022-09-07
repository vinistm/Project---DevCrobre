import { Request, Response } from "express";
import createClientInfoService from "../../services/client/createClientInfo.service";

const createClientInfoController = async (req: Request, res: Response) => {
  const document = req.params.document;
  const clientInfo = { document, body: req.body };

  const info = await createClientInfoService(clientInfo);

  return res.status(201).json(info);
};

export default createClientInfoController;
