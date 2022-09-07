import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Agreement } from "../../entities/agreement.entity";

const agreementDeleteService = async (id: number) => {
  const agreementRepository = AppDataSource.getRepository(Agreement);
  const agreementExists = await agreementRepository.findOneBy({ id: id });

  if (!agreementExists) {
    throw new AppError(404, "Agreement not found!");
  }

  await agreementRepository.delete({ id: id });
};

export default agreementDeleteService;
