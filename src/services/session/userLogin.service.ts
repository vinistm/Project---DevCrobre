import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { IUserLogin } from "../../interfaces/user";
import * as bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserInfo } from "../../entities/userInfo.entity";
import { User } from "../../entities/user.entity";

const userLoginService = async ({ email, password }: IUserLogin) => {
  const userInfoRepository = AppDataSource.getRepository(UserInfo);

  const userInfo = await userInfoRepository.findOneBy({ email: email });

  if (!userInfo) {
    throw new AppError(400, "Wrong email/password");
  }

  const passwordMatch = bcryptjs.compareSync(password, userInfo.password);

  if (!passwordMatch) {
    throw new AppError(400, "Wrong email/password");
  }

  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userInfo.id });

  const token = jwt.sign(
    {
      id: user!.id,
      position: user!.position,
      email: userInfo!.email,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
    }
  );

  return token;
};
export default userLoginService;
