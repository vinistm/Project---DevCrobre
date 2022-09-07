import { AppDataSource } from "../../data-source";
import { Agreement } from "../../entities/agreement.entity";
import { Equal } from "typeorm";

const listAgreementByUserService = async (userId: string): Promise<Agreement[]> => {
  const agreementRepository = AppDataSource.getRepository(Agreement);
  const agreements = await agreementRepository.find({
    where: {
      user: Equal(userId),
    }
  });
  return agreements;
};

export default listAgreementByUserService;
