import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { UserInfo } from "../../entities/userInfo.entity";
import { AppError } from "../../errors";

const listUserService = async (id: number): Promise<any> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.find();

  const verifyUser = user.find((user) => user.id === id);

  if (!verifyUser) {
    throw new AppError(404, "User not found!");
  }

  const userInfoRepository = AppDataSource.getRepository(UserInfo);
  const userInfo = await userInfoRepository.find();

  const verifyUserInfo = userInfo.find((user) => user.id === id);

  if (!verifyUserInfo) {
    throw new AppError(404, "User Info not found!");
  }

  const userReturn = {
    id: id,
    name: verifyUser.name,
    position: verifyUser.position,
    infos: {
      email: verifyUserInfo.email,
      telephone: verifyUserInfo.telephone,
      address: verifyUserInfo.address,
    },
  };

  return userReturn;
};
export default listUserService;
