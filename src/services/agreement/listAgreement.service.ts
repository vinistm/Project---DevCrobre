import { AppDataSource } from "../../data-source";
import { Agreement } from "../../entities/agreement.entity";

const listAgreementService = async () => {
  const agreementRepository = AppDataSource.getRepository(Agreement);
  const agreements = await agreementRepository.find();
  return agreements;
};

export default listAgreementService;
