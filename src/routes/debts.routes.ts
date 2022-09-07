import { Router } from "express";
import createDebtsController from "../controllers/debts/createDebts.controller";
import listDebtsController from "../controllers/debts/listDebts.controller";
import listOneDebtController from "../controllers/debts/listOneDebt.controller";
import schemaValidation from "../middlewares/schemaValidation";
import verifyAuthAdmManagerSupervisor from "../middlewares/verifyAuthAdmManagerSupervisor";
import verifyAuthAllNotHR from "../middlewares/verifyAuthAllNotHR";
import verifyAuthToken from "../middlewares/verifyAuthToken.middleware";
import debtRegisterSchema from "../schemas/debts/debt.schema";

const routes = Router();

export const debtsRoutes = () => {
  routes.get("", verifyAuthToken, verifyAuthAllNotHR, listDebtsController);
  routes.get(
    "/:id",
    verifyAuthToken,
    verifyAuthAllNotHR,
    listOneDebtController
  );
  routes.post(
    "",
    verifyAuthToken,
    verifyAuthAdmManagerSupervisor,
    schemaValidation(debtRegisterSchema),
    createDebtsController
  );

  return routes;
};
