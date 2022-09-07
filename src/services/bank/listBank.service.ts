import { Bank } from "../../entities/bank.entity";
import { AppDataSource } from "../../data-source";

const listBankService = async (): Promise<Bank[]> => {
  const bankRepository = AppDataSource.getRepository(Bank);

  const banks = await bankRepository.find();

  return banks;
};

export default listBankService;
