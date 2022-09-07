import { ContactHistory } from "../../entities/contactHistory.entity";
import { AppDataSource } from "../../data-source";

const listHistoryService = async():Promise<ContactHistory[]> =>{
    const historyRepository = AppDataSource.getRepository(ContactHistory);
    
    const history = await historyRepository.find();
    
    return history;
};

export default listHistoryService