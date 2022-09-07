import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { ContactHistory } from "../../entities/contactHistory.entity";

const updateHistoryService = async(id:number,date_contact:any,agreement:boolean,note:string)=>{
    const historyRepository = AppDataSource.getRepository(ContactHistory);
    const historyExists = await historyRepository.findOneBy({id:id})

    if(!historyExists){
        throw new AppError(404, "Contact history not found!");
    }

    const newDate_contact = date_contact
    const newAgreement = agreement
    const newNote=note

    await historyRepository.update(historyExists!.id,{
        date_contact:newDate_contact,
        agreement:newAgreement,
        note:newNote
    });

    return true;


}

export default updateHistoryService
