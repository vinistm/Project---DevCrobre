import { Request, Response } from "express";
import updateClientInfoService from "../../services/client/updateClientInfo.service";
const updateClientInfoController = async (req: Request, res: Response) => {
  const document = req.params.document;
  const idContact = req.params.idContact;
  const data = req.body;

  await updateClientInfoService(document, idContact, data);

  return res.status(200).json({ message: "Contact updated with sucess!" });
};

export default updateClientInfoController;
