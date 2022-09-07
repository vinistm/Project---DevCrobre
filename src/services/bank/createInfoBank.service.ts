import { AppDataSource } from "../../data-source";
import { Bank } from "../../entities/bank.entity";
import { BankContact } from "../../entities/bankContact.entity";
import { AppError } from "../../errors";
import { IBankInfoOf } from "../../interfaces/bank";

const createBankInfoService = async (data: IBankInfoOf): Promise<any> => {
  const bankRepository = AppDataSource.getRepository(Bank);

  const findBank = await bankRepository.findOneBy({ id: parseInt(data.id) });

  if (!findBank) {
    throw new AppError(404, "Bank not found!");
  }

  const bankInfoRepository = AppDataSource.getRepository(BankContact);

  const email = findBank.bankContact.find(
    ({ email }) => email === data.body.email
  );

  const telephone = findBank.bankContact.find(
    ({ telephone }) => telephone === data.body.telephone
  );

  if (!email && !telephone) {
    const bankInfo = bankInfoRepository.create({
      telephone: data.body.telephone,
      email: data.body.email,
      bank: findBank,
    });

    await bankInfoRepository.save(bankInfo);

    return { message: "Information entered successfully!" };
  }

  if (!email) {
    const bankInfo = bankInfoRepository.create({
      email: data.body.email,
      bank: findBank,
    });

    await bankInfoRepository.save(bankInfo);

    return { message: "Updated email!" };
  }

  if (!telephone) {
    const bankInfo = bankInfoRepository.create({
      telephone: data.body.telephone,
      bank: findBank,
    });

    await bankInfoRepository.save(bankInfo);
    return { message: "Phone updated!" };
  }

  throw new AppError(404, "information already exists!");
};

export default createBankInfoService;
