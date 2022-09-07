import { AppDataSource } from "../../data-source";
import { ContactHistory } from "../../entities/contactHistory.entity";
import { AppError } from "../../errors";

const deleteHistoryService = async(id:number)=>{
    const historyRepository = AppDataSource.getRepository(ContactHistory);
    const historyExists = await historyRepository.findOneBy({id:id});

    if(!historyExists){
        throw new AppError(404,"Contact history not found!")
    }
    await historyRepository.delete({id:id})
};
export default deleteHistoryService