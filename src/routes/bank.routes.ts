import { Router } from "express";
import createBankController from "../controllers/bank/createBank.controller";
import createBankInfoController from "../controllers/bank/createBankInfo.controller";
import deleteBankController from "../controllers/bank/deleteBank.controller";
import deleteBankInfoController from "../controllers/bank/deleteBankInfo.controller";
import listBankController from "../controllers/bank/listBank.controller";
import listBankInfoController from "../controllers/bank/listBankInfo.controller";
import listOneBankController from "../controllers/bank/listOneBank.controller";
import updateBankController from "../controllers/bank/updateBank.controller";
import updateBankInfoController from "../controllers/bank/updateBankInfo.controller";
import schemaValidation from "../middlewares/schemaValidation";
import verifyAuthAdmHRSupervisor from "../middlewares/verifyAuthAdmHRSupervisor";
import verifyAuthAdmManager from "../middlewares/verifyAuthAdmManager";
import verifyAuthAllNotUser from "../middlewares/verifyAuthAllNotUser";
import verifyAuthToken from "../middlewares/verifyAuthToken.middleware";
import createBankSchema from "../schemas/bank/bank.schema";

const routes = Router();

export const bankRoutes = () => {
  routes.get(
    "",
    verifyAuthToken,
    verifyAuthAdmHRSupervisor,
    listBankController
  );
  routes.post(
    "",
    verifyAuthToken,
    verifyAuthAdmManager,
    schemaValidation(createBankSchema),
    createBankController
  );
  routes.get(
    "/:id",
    verifyAuthToken,
    verifyAuthAllNotUser,
    listOneBankController
  );
  routes.patch(
    "/:id",
    verifyAuthToken,
    verifyAuthAdmManager,
    updateBankController
  );
  routes.delete(
    "/:id",
    verifyAuthToken,
    verifyAuthAdmManager,
    deleteBankController
  );
  routes.get(
    "/:id/contact",
    verifyAuthToken,
    verifyAuthAllNotUser,
    listBankInfoController
  );
  routes.post(
    "/:id/contact",
    verifyAuthToken,
    verifyAuthAdmManager,
    createBankInfoController
  );
  routes.patch(
    "/:id/contact/:idContact",
    verifyAuthToken,
    verifyAuthAdmManager,
    updateBankInfoController
  );
  routes.delete(
    "/:id/contact/:idContact",
    verifyAuthToken,
    verifyAuthAdmManager,
    deleteBankInfoController
  );
  return routes;
};
