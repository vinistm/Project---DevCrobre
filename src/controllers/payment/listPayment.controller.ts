import { Request, Response } from "express";
import listPaymentService from "../../services/payment/listPayment.service";

const listPaymentController = async (req: Request, res: Response) => {
  const payments = await listPaymentService();

  return res.json(payments);
};

export default listPaymentController;
