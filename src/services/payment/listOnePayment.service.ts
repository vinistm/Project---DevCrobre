import { FormOfPayment } from "../../entities/formOfPayment.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

const listOnePaymentService = async (id: number) => {
  const paymentRepository = AppDataSource.getRepository(FormOfPayment);
  const payments = await paymentRepository.find();

  const verifyPayments = payments.find((payment) => payment.id === id);

  if (!verifyPayments) {
    throw new AppError(404, "Payment not found!");
  }
  return verifyPayments;
};

export default listOnePaymentService;
