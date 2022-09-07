import { AppDataSource } from "../../data-source";
import { UserInfo } from "../../entities/userInfo.entity";
import { AppError } from "../../errors";
import * as bcryptjs from "bcryptjs";
import { User, UserRole } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/user";

const createAdmService = async (data: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = new User();
  user.name = data.body.name;
  user.position = UserRole.ADM;

  const userInfoRepository = AppDataSource.getRepository(UserInfo);

  const userExists = await userInfoRepository.findOneBy({
    email: data.body.email,
  });

  if (userExists) {
    throw new AppError(409, "User already exists!");
  }

  const createUser = userRepository.create(user);

  const saveUser = await userRepository.save(createUser);

  const hashedPassword = bcryptjs.hashSync(data.body.password, 10);

  const userInfoCreate = userInfoRepository.create({
    email: data.body.email,
    password: hashedPassword,
    user: saveUser,
  });

  await userInfoRepository.save(userInfoCreate);

  return { message: "Adm Created Width Sucess." };
};

export default createAdmService;
