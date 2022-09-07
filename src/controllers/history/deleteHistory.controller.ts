import { Request, Response } from "express";
import deleteHistoryService from "../../services/history/deleteHistory.service";

const deleteHistoryController = async (req: Request, res: Response) => {
    const id = req.params.id;
    const idNumber = parseInt(id);
  
    await deleteHistoryService(idNumber);
  
    return res.status(200).json({ message: "Contact history deleted witdh sucess!" });
  };
  
  export default deleteHistoryController;