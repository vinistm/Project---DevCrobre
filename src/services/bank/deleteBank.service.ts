import { AppDataSource } from "../../data-source";
import { Bank } from "../../entities/bank.entity";
import { AppError } from "../../errors";

const bankDeleteService = async (id: number) => {
  const bankRepository = AppDataSource.getRepository(Bank);

  const bankExists = await bankRepository.findOneBy({ id: id });

  if (!bankExists) {
    throw new AppError(404, "Bank not found!");
  }

  await bankRepository.delete({ id: id });
};

export default bankDeleteService;
