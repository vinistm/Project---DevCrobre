import { AppDataSource } from "../../data-source";
import { Bank } from "../../entities/bank.entity";
import { Client } from "../../entities/client.entity";
import { Debts } from "../../entities/debt.entity";
import { AppError } from "../../errors";
import { IDebtsRequest } from "../../interfaces/debts";
import verifyDebtType from "../../utils/verifyDebtType";

const createDebtsService = async ({
  bankId,
  dateDebt,
  debtOrigin,
  debtType,
  debtValue,
  documentClient,
  ipoc,
}: IDebtsRequest) => {
  const clientRepository = AppDataSource.getRepository(Client);
  const client = await clientRepository.findOneBy({
    document: documentClient,
  });

  if (!client) {
    throw new AppError(400, "Client does not exists!");
  }
  const bankRepository = AppDataSource.getRepository(Bank);
  const bank = await bankRepository.findOneBy({ id: bankId });

  if (!bank) {
    throw new AppError(400, "Bank does not exists!");
  }

  const debtRepository = AppDataSource.getRepository(Debts);
  const ipocAlreadyExists = await debtRepository.findOneBy({
    ipoc: ipoc,
  });

  if (ipocAlreadyExists !== null) {
    throw new AppError(400, "Ipoc already exists!");
  }

  const debt = new Debts();
  debt.bank = bank;
  debt.client = client;
  debt.dateDebt = dateDebt;
  debt.debtOrigin = debtOrigin;
  debt.debtValue = debtValue;
  debt.ipoc = ipoc;
  debt.debtType = verifyDebtType(debtType);

  debtRepository.create(debt);

  await debtRepository.save(debt);

  return debt;
};

export default createDebtsService;
