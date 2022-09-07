import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { AppError } from "../../errors";

const deleteClientService = async (document: string): Promise<void> => {
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({
    document: document,
  });

  if (!client) {
    throw new AppError(404, "Client not found!");
  }

  await clientRepository.delete({ document: document });
};

export default deleteClientService;
