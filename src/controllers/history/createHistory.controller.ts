import { Request, Response } from "express";
import createContactHistoryService from "../../services/history/createHistory.service";
const createHistoryController = async (req: Request, res: Response) => {
  const { debtId, date_contact, agreement, note, userId } = req.body;

  const newHistory = await createContactHistoryService({
    debtId,
    date_contact,
    agreement,
    note,
    userId,
  });

  return res.status(201).json(newHistory);
};

export default createHistoryController;
