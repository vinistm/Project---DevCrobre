import { Request, Response } from "express";
import paymentDeleteService from "../../services/payment/deletePayment.service";

const deletePaymentController = async( req:Request,res:Response)=>{
    const id = req.params.id;
    const idNumber = parseInt(id);

    await paymentDeleteService(idNumber);
    return res.status(200).json({message:"Payment deleted witdh sucess!"})
};
export default deletePaymentController
