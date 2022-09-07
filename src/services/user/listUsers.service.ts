import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";

const listUsersService = async (): Promise<User[]> => {
  const usersRepository = AppDataSource.getRepository(User);

  const users = await usersRepository.find();

  return users;
};
export default listUsersService;
