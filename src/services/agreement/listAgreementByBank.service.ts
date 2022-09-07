import { AppDataSource } from "../../data-source";
import { Agreement } from "../../entities/agreement.entity";
import { Bank } from "../../entities/bank.entity";

import { Equal } from "typeorm";

const listAgreementByBankService = async (bankId: string): Promise<Agreement[]> => {
  const agreementRepository = AppDataSource.getRepository(Agreement);
  const agreements = await agreementRepository.find({
    where: {
      bank: Equal(bankId),
    }
  });
  return agreements;
};

export default listAgreementByBankService;
