import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { ClientInfo } from "../../entities/clientInfo.entity";
import { AppError } from "../../errors";

const deleteClientInfoService = async (document: string, idContact: string) => {
  const clientRepository = AppDataSource.getRepository(Client);
  const findClient = await clientRepository.findOneBy({
    document: document,
  });

  if (!findClient) {
    throw new AppError(404, "Client not found!");
  }

  const contactExists = findClient.clientInfo.find(
    (contact) => contact.id === parseInt(idContact)
  );

  if (!contactExists) {
    throw new AppError(404, "Client contact not found!");
  }
  const infoRepository = AppDataSource.getRepository(ClientInfo);

  await infoRepository.delete({ id: parseInt(idContact) });
};

export default deleteClientInfoService;
