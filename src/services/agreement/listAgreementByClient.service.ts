import { AppDataSource } from "../../data-source";
import { Agreement } from "../../entities/agreement.entity";
import { Equal } from "typeorm";

const listAgreementByClientService = async (clientId: string): Promise<Agreement[]> => {
  const agreementRepository = AppDataSource.getRepository(Agreement);
  const agreements = await agreementRepository.find({
    where: {
      client: Equal(clientId),
    }
  });
  return agreements;
};

export default listAgreementByClientService;
