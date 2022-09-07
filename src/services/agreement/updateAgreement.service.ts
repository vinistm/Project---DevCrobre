import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Agreement } from "../../entities/agreement.entity";
import { IAgreementUpdate } from "../../interfaces/agreement";

const updateAgreementService = async ({ id, agreedValue, dateAgree, status }: IAgreementUpdate)=> {
  const agreementRepository = AppDataSource.getRepository(Agreement);
  const agreementExists = await agreementRepository.findOneBy({ id: id });
  if (!agreementExists) {
    throw new AppError(409, "Agreement not found!");
  }
  const entry = agreementRepository.update(agreementExists!.id, {
    agreedvalue: agreedValue,
    dateagree: dateAgree,
    status: status
  });
  return entry;
};

export default updateAgreementService;
