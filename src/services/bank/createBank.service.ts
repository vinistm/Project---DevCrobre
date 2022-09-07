import { IBankRequest } from "../../interfaces/bank";
import { AppDataSource } from "../../data-source";
import { Bank } from "../../entities/bank.entity";
import { AppError } from "../../errors";

const createBankService = async ({ name, status }: IBankRequest) => {
  const bankRepository = AppDataSource.getRepository(Bank);

  const bankExists = await bankRepository.findOneBy({ name: name });

  if (bankExists) {
    throw new AppError(409, "Bank already exists!");
  }

  const bank = bankRepository.create({
    name,
    status,
  });

  await bankRepository.save(bank);

  return bank;
};

export default createBankService;
