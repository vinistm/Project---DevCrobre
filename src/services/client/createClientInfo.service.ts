import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { ClientInfo } from "../../entities/clientInfo.entity";
import { AppError } from "../../errors";
import { IInfoClient } from "../../interfaces/client";

const createClientInfoService = async (data: IInfoClient): Promise<any> => {
  const clientRepository = AppDataSource.getRepository(Client);

  const findClient = await clientRepository.findOneBy({
    document: data.document,
  });

  if (!findClient) {
    throw new AppError(404, "Client not found");
  }
  const clientInfoRepository = AppDataSource.getRepository(ClientInfo);

  const email = findClient.clientInfo.find(
    ({ email }) => email === data.body.email
  );
  const telephone = findClient.clientInfo.find(
    ({ telephone }) => telephone === data.body.telephone
  );

  if (!email && !telephone) {
    const clientInfo = clientInfoRepository.create({
      telephone: data.body.telephone,
      email: data.body.email,
      client: findClient,
    });

    await clientInfoRepository.save(clientInfo);

    return { message: "Information entered successfully!" };
  }

  if (!email) {
    const clientInfo = clientInfoRepository.create({
      email: data.body.email,
      client: findClient,
    });

    await clientInfoRepository.save(clientInfo);

    return { message: "Updated email!" };
  }

  if (!telephone) {
    const clientInfo = clientInfoRepository.create({
      telephone: data.body.telephone,
      client: findClient,
    });

    await clientInfoRepository.save(clientInfo);

    return { message: "Phone uptaded!" };
  }

  throw new AppError(404, "Information already exists!");
};

export default createClientInfoService;
