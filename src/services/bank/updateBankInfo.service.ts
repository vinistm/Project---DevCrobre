import { AppDataSource } from "../../data-source";
import { Bank } from "../../entities/bank.entity";
import { BankContact } from "../../entities/bankContact.entity";
import { AppError } from "../../errors";

const updateBankInfoService = async (
  id: string,
  idContact: string,
  data: any
) => {
  const bankRepository = AppDataSource.getRepository(Bank);
  const bankExists = await bankRepository.findOneBy({ id: parseInt(id) });

  if (!bankExists) {
    throw new AppError(404, "Bank not found!");
  }

  const bankInfoRepository = AppDataSource.getRepository(BankContact);

  const bankInfoExists = await bankInfoRepository.findOneBy({
    id: parseInt(idContact),
  });

  if (!bankInfoExists) {
    throw new AppError(404, "Bank Contact not found!");
  }

  await bankInfoRepository.update(idContact, {
    ...bankInfoExists,
    ...data,
  });

  return;
};

export default updateBankInfoService;
