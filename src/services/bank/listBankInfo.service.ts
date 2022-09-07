import { AppDataSource } from "../../data-source";
import { Bank } from "../../entities/bank.entity";
import { AppError } from "../../errors";

const listBankInfoService = async (id: string) => {
  const bankRepository = AppDataSource.getRepository(Bank);

  const bankExists = await bankRepository.findOneBy({ id: parseInt(id) });

  if (!bankExists) {
    throw new AppError(404, "Bank not found!");
  }

  return bankExists;
};

export default listBankInfoService;
