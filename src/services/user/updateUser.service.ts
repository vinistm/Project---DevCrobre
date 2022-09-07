import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { IUserUpdate } from "../../interfaces/user";
import { UserInfo } from "../../entities/userInfo.entity";
import verifyUserType from "../../utils/verifyUserType";

const updateUserService = async (id: string, data: IUserUpdate) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: Number(id),
  });

  if (!user) {
    throw new AppError(404, "User does not exists!");
  }

  const userInfoId = user?.id;

  const userInfoRepository = AppDataSource.getRepository(UserInfo);

  const userInfos = await userInfoRepository.findOneBy({ id: userInfoId });

  if (!userInfos) {
    throw new AppError(404, "User does not exists!");
  }

  const newName = data.body.name;
  const newPosition = data.body.position;

  await userRepository.update(user!.id, {
    name: newName,
    position: verifyUserType(newPosition),
  });

  const newTelephone = data.body.telephone;
  const newEmail = data.body.email;
  const newAddress = data.body.address;

  await userInfoRepository.update(userInfoId, {
    telephone: newTelephone,
    email: newEmail,
    address: newAddress,
  });

  return;
};

export default updateUserService;
