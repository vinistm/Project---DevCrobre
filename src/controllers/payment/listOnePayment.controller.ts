import { Request, Response } from "express";
import listOnePaymentService from "../../services/payment/listOnePayment.service";

const listOnePaymentController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const payments = await listOnePaymentService(Number(id));

  return res.status(200).json(payments);
};

export default listOnePaymentController;
