import { FormOfPayment} from "../../entities/formOfPayment.entity";
import { AppDataSource } from "../../data-source";

const listPaymentService = async () : Promise<FormOfPayment[]> =>{
    const paymentRepository = AppDataSource.getRepository(FormOfPayment)
    const payments = await paymentRepository.find();

    return payments

};

export default listPaymentService


