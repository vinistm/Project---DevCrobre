import { Request, Response } from "express";
import updatePaymentService from "../../services/payment/updatePayment.service";

const updatePaymentController = async (req: Request, res: Response) => {
    const id = req.params.id;
    const idNumber = parseInt(id);
  
    const { cash_payment,installments,entry_installments,entry,installments_times,values_installments } = req.body;
  
    await updatePaymentService(idNumber,cash_payment,installments,entry_installments,entry,installments_times,values_installments);
  
    return res.status(200).json({ message: "Updated payment!" });
  };
  
  export default updatePaymentController;