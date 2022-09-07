import { Request, Response } from "express";
import updateHistoryService from "../../services/history/updateHistory.service";

const updateHistoryController = async(req:Request,res:Response) =>{
    const id = req.params.id;
    const idnumber=parseInt(id);

    const{date_contact,agreement,note} = req.body;
    await updateHistoryService(idnumber,date_contact,agreement,note);

    return res.status(200).json({message:"Update contact History"})
};

export default updateHistoryController
