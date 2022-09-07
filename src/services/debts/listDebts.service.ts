import { AppDataSource } from "../../data-source";
import { Debts } from "../../entities/debt.entity";

const listDebtsService = async () => {
  const debtsRepository = AppDataSource.getRepository(Debts);
  const debts = await debtsRepository.find();

  return debts;
};
export default listDebtsService;
