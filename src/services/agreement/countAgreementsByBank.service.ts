import { AppDataSource } from "../../data-source";
import { Agreement } from "../../entities/agreement.entity";
import { Equal } from "typeorm";

const countAgreementsByBankService = async (bankId: string) => {
  const agreementRepository = AppDataSource.getRepository(Agreement);
  const completed = await agreementRepository.count({where: {
    status: true,
    bank: Equal(bankId),
}});
const pending = await agreementRepository.count({where: {
    status: false,
    bank: Equal(bankId),
}});
  return { completed, pending };
};

export default countAgreementsByBankService;
