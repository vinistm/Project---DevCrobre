import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { AppError } from "../../errors";

const updateClientService = async (document: string, name: string) => {
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({
    document: document,
  });

  if (!client) {
    throw new AppError(404, "Client not found!");
  }

  const newName = name;

  await clientRepository.update(client!.document, {
    document: client!.document,
    name: newName,
    type: client!.type,
  });

  return true;
};

export default updateClientService;
