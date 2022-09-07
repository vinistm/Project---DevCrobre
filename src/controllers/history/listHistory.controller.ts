import { Request,Response } from "express";
import listHistoryService from "../../services/history/listHistory.service";

const listHistoryController = async (req:Request,res:Response) =>{
    
    const history = await listHistoryService();

    return res.json(history);
};
export default listHistoryController;
