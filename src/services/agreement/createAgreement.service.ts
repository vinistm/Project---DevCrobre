import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Agreement, FormOfPayment } from "../../entities/agreement.entity";
import { Bank } from "../../entities/bank.entity";
import { Debts } from "../../entities/debt.entity";
import { Client } from "../../entities/client.entity";
// import { FormOfPayment } from "../../entities/formOfPayment.entity";
import { User } from "../../entities/user.entity";
import { IAgreementRequest } from "../../interfaces/agreement";

const createAgreementService = async ({
  agreedValue,
  dateAgree,
  status,
  debts,
  bank,
  client,
  user,
  formOfPayment,
  installments,
  valueEntry,
}: any) => {
  const debtsRepository = AppDataSource.getRepository(Debts);
  const debtsId = await debtsRepository.findOneBy({ id: debts });
  if (!debtsId) {
    throw new AppError(409, "Debt not found!");
  }

  const bankRepository = AppDataSource.getRepository(Bank);
  const bankId = await bankRepository.findOneBy({ id: parseInt(bank) });
  if (!bankId) {
    throw new AppError(409, "Bank not found!");
  }

  const clientRepository = AppDataSource.getRepository(Client);
  const clientId = await clientRepository.findOneBy({ document: client });
  if (!clientId) {
    throw new AppError(409, "Client not found!");
  }

  if (formOfPayment === "parcelado") {
    const agreementRepository = AppDataSource.getRepository(Agreement);

    const agreement = new Agreement();
    agreement.agreedvalue = agreedValue;
    agreement.dateagree = dateAgree;
    agreement.status = status;
    agreement.user = user;
    agreement.installments = installments;
    agreement.debts = debtsId;
    agreement.bank = bankId;
    agreement.client = clientId;
    agreement.valueEntry = "0";
    agreement.formOfPayment = FormOfPayment.PARCELADO;

    agreementRepository.create(agreement);

    await agreementRepository.save(agreement);

    return agreement;
  }

  if (formOfPayment === "entrada") {
    const agreementRepository = AppDataSource.getRepository(Agreement);

    const agreement = new Agreement();

    agreement.agreedvalue = agreedValue;
    agreement.dateagree = dateAgree;
    agreement.status = status;
    agreement.installments = installments;
    agreement.user = user;
    agreement.valueEntry = valueEntry;
    agreement.debts = debtsId;
    agreement.bank = bankId;
    agreement.client = clientId;
    agreement.formOfPayment = FormOfPayment.ENTRADA;

    agreementRepository.create(agreement);

    await agreementRepository.save(agreement);

    return agreement;
  }
  const agreementRepository = AppDataSource.getRepository(Agreement);
  const agreement = new Agreement();

  agreement.agreedvalue = agreedValue;
  agreement.dateagree = dateAgree;
  agreement.status = status;
  agreement.user = user;
  agreement.debts = debtsId;
  agreement.bank = bankId;
  agreement.client = clientId;
  agreement.installments = "1x";
  agreement.valueEntry = agreedValue;

  agreementRepository.create(agreement);

  await agreementRepository.save(agreement);

  return agreement;
};

export default createAgreementService;
