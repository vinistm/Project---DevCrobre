import { AppDataSource } from "../../data-source";
import { Agreement } from "../../entities/agreement.entity";

const countAgreementsService = async () => {
  const agreementRepository = AppDataSource.getRepository(Agreement);
  const completed = await agreementRepository.count({where: {
    status: true,
}});
const pending = await agreementRepository.count({where: {
    status: false,
}});
  return { completed, pending };
};

export default countAgreementsService;
