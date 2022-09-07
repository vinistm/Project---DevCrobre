import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { AppError } from "../../errors";

const listClientInfoService = async (document: string) => {
  const clientRepository = AppDataSource.getRepository(Client);
  const findAccount = await clientRepository.findOneBy({
    document: document,
  });

  if (!findAccount) {
    throw new AppError(404, "Client not found!");
  }

  return findAccount;
};

export default listClientInfoService;
