import { AppDataSource } from "../../data-source";
import { Bank } from "../../entities/bank.entity";
import { AppError } from "../../errors";

const updateBankService = async (id: number, name: string) => {
  const bankRepository = AppDataSource.getRepository(Bank);

  const bankExists = await bankRepository.findOneBy({ id: id });

  if (!bankExists) {
    throw new AppError(404, "Bank not found!");
  }

  const newName = name;

  await bankRepository.update(bankExists!.id, {
    name: newName,
    status: bankExists!.status,
  });

  return true;
};

export default updateBankService;
