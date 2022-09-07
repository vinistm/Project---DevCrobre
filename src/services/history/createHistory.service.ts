import { ContactHistory } from "../../entities/contactHistory.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Debts } from "../../entities/debt.entity";
import { User } from "../../entities/user.entity";

const createContactHistoryService = async (data: any) => {
  const { date_contact, agreement, note, debtId, userId } = data;
  const historyRepository = AppDataSource.getRepository(ContactHistory);

  const debtRepository = AppDataSource.getRepository(Debts);
  const debt = await debtRepository.findOneBy({ id: debtId });

  if (!debt) {
    throw new AppError(400, "Debts does not exists!");
  }
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError(400, "Client not exists!");
  }

  const history = historyRepository.create({
    ...data,
    debts: debt,
    date: date_contact,
    agreement: agreement,
    note: note,
    users: user,
  });
  await historyRepository.save(history);

  const returnHistory = {
    date: date_contact,
    agreement: agreement,
    note: note,

    debts: debt.id,
    user_entry_contact: user.name,
  };

  return returnHistory;
};

export default createContactHistoryService;
