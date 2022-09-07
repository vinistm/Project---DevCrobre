import { AppDataSource } from "../../data-source";
import { FormOfPayment } from "../../entities/formOfPayment.entity";
import { AppError } from "../../errors";

const updatePaymentService = async(id:number,cash_payment:boolean,installments:boolean, entry_installments:boolean,entry:number,installments_times:number,values_installments:number) => {
    const paymentRepository = AppDataSource.getRepository(FormOfPayment);

    const paymentExists = await paymentRepository.findOneBy({id:id});

    if(!paymentExists){
        throw new AppError(404,"Payment not found!");
    }

    const newCashPayment = cash_payment;
    const newInstallment = installments;
    const newEntry_installments = entry_installments;
    const newEntry = entry;
    const newInstallments_times = installments_times
    const newValues_installments = values_installments

    await paymentRepository.update(paymentExists!.id,{
        cash_payment:newCashPayment,
        installments:newInstallment,
        entry_installments:newEntry_installments,
        entry:newEntry,
        installments_times:newInstallments_times,
        values_installments:newValues_installments
    });

    return true;   
};

export default updatePaymentService;