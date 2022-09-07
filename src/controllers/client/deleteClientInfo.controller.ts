import { Request, Response } from "express";
import deleteClientInfoService from "../../services/client/deleteClientInfo.service";
const deleteClientInfoController = async (req: Request, res: Response) => {
  const documents = req.params.document;
  const idContact = req.params.idContact;

  await deleteClientInfoService(documents, idContact);

  return res.status(200).json({ message: "Contact deleted with sucess!" });
};

export default deleteClientInfoController;
