import { AppDataSource } from "../../data-source";
import { Debts } from "../../entities/debt.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";

const createUserDebtService = async (user: string, debts: []): Promise<any> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({ id: parseInt(user) });
  if (!findUser) {
    throw new AppError(404, "User not found!");
  }

  const debtRepository = AppDataSource.getRepository(Debts);
  const debt = await debtRepository
    .createQueryBuilder("debts")
    .where("debts.id IN (:...debts)", { debts: [...debts] })
    .getMany();

  if (debt.length < 1) {
    throw new AppError(404, "Debt not found!");
  }

  debt.forEach(async (debt) => {
    debt.user = findUser;
    await debtRepository.save(debt);
  });

  return { message: "Successfully allocated debts" };
};

export default createUserDebtService;
