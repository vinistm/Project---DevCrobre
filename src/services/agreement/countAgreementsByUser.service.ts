import { AppDataSource } from "../../data-source";
import { Agreement } from "../../entities/agreement.entity";
import { Equal } from "typeorm";

const countAgreementsByUserService = async (userId: string) => {
  const agreementRepository = AppDataSource.getRepository(Agreement);
  const completed = await agreementRepository.count({where: {
    status: true,
    user: Equal(userId),
}});
const pending = await agreementRepository.count({where: {
    status: false,
    user: Equal(userId),
}});
  return { completed, pending };
};

export default countAgreementsByUserService;
