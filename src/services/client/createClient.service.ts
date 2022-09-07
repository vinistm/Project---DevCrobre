import { IClientRequest } from "../../interfaces/client";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { AppError } from "../../errors";
const createClientService = async ({
  document,
  name,
  type,
}: IClientRequest) => {
  const clientRepository = AppDataSource.getRepository(Client);

  const findClient = await clientRepository.findOne({
    where: {
      document: document,
    },
  });

  if (findClient) {
    throw new AppError(409, "Client already exists");
  }

  const client = clientRepository.create({
    document,
    name,
    type,
  });

  await clientRepository.save(client);

  return client;
};

export default createClientService;
