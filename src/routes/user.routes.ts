import { Router } from "express";

import createUserDebtController from "../controllers/userDebt/createUserDebt.controller";
import createUserController from "../controllers/user/createUser.controller";
import schemaValidation from "../middlewares/schemaValidation";
import registerSchema from "../schemas/register/register.schema";
import listUsersController from "../controllers/user/listUsers.controller";
import listOneUserController from "../controllers/user/listOneUser.controller";
import deleteUserController from "../controllers/user/deleteUser.controller";
import updateUserController from "../controllers/user/updateUser.controller";
import verifyAuthToken from "../middlewares/verifyAuthToken.middleware";
import listUserDebtsController from "../controllers/userDebt/listUserDebts.controller";
import verifyAuthAdmHR from "../middlewares/verifyAuthAdmHR.middleware";
import verifyAuthAdmHRManagerSupervisor from "../middlewares/verifyAuthAdmHRManagerSupervisor";
import verifyAuthAllNotHR from "../middlewares/verifyAuthAllNotHR";
import verifyAuthAdmSupervisor from "../middlewares/verifyAuthAdmSupervisor";
const routes = Router();

export const userRoutes = () => {
  routes.post(
    "",
    verifyAuthToken,
    verifyAuthAdmHR,
    schemaValidation(registerSchema),
    createUserController
  );
  routes.get(
    "",
    verifyAuthToken,
    verifyAuthAdmHRManagerSupervisor,
    listUsersController
  );
  routes.get(
    "/:id",
    verifyAuthToken,
    verifyAuthAdmHRManagerSupervisor,
    listOneUserController
  );
  routes.delete("/:id", verifyAuthToken, verifyAuthAdmHR, deleteUserController);
  routes.patch("/:id", verifyAuthToken, verifyAuthAdmHR, updateUserController);

  // Aloca divida para o usuario.
  routes.post(
    "/debts/:userId",
    verifyAuthToken,
    verifyAuthAdmSupervisor,
    createUserDebtController
  );
  routes.get(
    "/debts/me",
    verifyAuthToken,
    verifyAuthAllNotHR,
    listUserDebtsController
  );

  return routes;
};
