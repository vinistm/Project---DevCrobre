import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Bank } from "../../entities/bank.entity";

const listOneBankService = async (id: string) => {
  const BankRepository = AppDataSource.getRepository(Bank);

  const bank = await BankRepository.findOneBy({
    id: parseInt(id),
  });

  if (!bank) {
    throw new AppError(404, "Bank not found!");
  }

  return bank;
};

export default listOneBankService;
