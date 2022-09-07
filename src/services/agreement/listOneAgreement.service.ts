import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Agreement } from "../../entities/agreement.entity";
import { Equal } from "typeorm";

const listOneAgreementService = async (id: string) => {
  const agreementRepository = AppDataSource.getRepository(Agreement);

  const agreement = await agreementRepository.findOneBy({
    id: Number(id)
  });

  if (!agreement) {
    throw new AppError(404, "Agreement not found!");
  }

  return agreement;
};

export default listOneAgreementService;
