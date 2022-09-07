import { AppDataSource } from "../../data-source";
import { Bank } from "../../entities/bank.entity";
import { BankContact } from "../../entities/bankContact.entity";
import { AppError } from "../../errors";

const deleteBankInfoService = async (id: string, idContact: string) => {
  const bankRepository = AppDataSource.getRepository(Bank);
  const bankExists = await bankRepository.findOneBy({ id: parseInt(id) });

  if (!bankExists) {
    throw new AppError(404, "Bank not found!");
  }

  const contactExists = bankExists.bankContact.find(
    (contact) => contact.id === parseInt(idContact)
  );

  if (!contactExists) {
    throw new AppError(404, "Bank contact not found!");
  }

  const bankInfoRepository = AppDataSource.getRepository(BankContact);

  await bankInfoRepository.delete({ id: parseInt(idContact) });
};

export default deleteBankInfoService;
