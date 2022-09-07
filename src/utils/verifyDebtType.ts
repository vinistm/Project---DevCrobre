import { DebtType } from "../entities/debt.entity";

const verifyDebtType = (data: string): any => {
  if (data === "emprestimo") {
    return DebtType.EMPRESTIMO;
  }
  if (data === "credito") {
    return DebtType.CREDITO;
  }
};

export default verifyDebtType;
