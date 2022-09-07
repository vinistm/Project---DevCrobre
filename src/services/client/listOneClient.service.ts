import { Client } from "../../entities/client.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

const listOneClientService = async (document: string) => {
  const clientRepository = AppDataSource.getRepository(Client);

  const clients = await clientRepository.findOneBy({
    document: document,
  });

  if (!clients) {
    throw new AppError(404, "Client not found!");
  }

  return clients;
};

export default listOneClientService;
