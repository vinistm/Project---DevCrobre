import { AppDataSource } from "../../data-source";
import { FormOfPayment } from "../../entities/formOfPayment.entity";
import { AppError } from "../../errors";
import bankDeleteService from "../bank/deleteBank.service";

const paymentDeleteService = async (id:number) =>{
    const paymentRepository = AppDataSource.getRepository(FormOfPayment);
    const paymentExists = await paymentRepository.findOneBy({id:id})

    if(!paymentExists){
        throw new AppError(404,"Payment not found!");
    }

    await paymentRepository.delete({id:id});
};

export default paymentDeleteService;
