import { AppDataSource } from "../../data-source";
import { Agreement } from "../../entities/agreement.entity";
import { Equal } from "typeorm";

const countAgreementsByClientService = async (clientId: string) => {
  const agreementRepository = AppDataSource.getRepository(Agreement);
  const completed = await agreementRepository.count({where: {
    status: true,
    client: Equal(clientId),
}});
const pending = await agreementRepository.count({where: {
    status: false,
    bank: Equal(clientId),
}});
  return { completed, pending };
};

export default countAgreementsByClientService;
