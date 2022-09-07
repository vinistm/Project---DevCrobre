import { Router } from "express";
import listAgreementController from "../controllers/agreement/listAgreement.controller";
import createAgreementController from "../controllers/agreement/createAgreement.controller";
import updateAgreementController from "../controllers/agreement/updateAgreement.controller";
import deleteAgreementController from "../controllers/agreement/deleteAgreement.controller";
import listOneAgreementController from "../controllers/agreement/listOneAgreement.controller";
import listAgreementByBankController from "../controllers/agreement/listAgreementByBank.controller";
import listAgreementByClientController from "../controllers/agreement/listAgreementByClient.controller";
import listAgreementByUserController from "../controllers/agreement/listAgreementByUser.controller";
import verifyAuthToken from "../middlewares/verifyAuthToken.middleware";
import verifyAuthAllNotHR from "../middlewares/verifyAuthAllNotHR";
import verifyAuthAdmManagerSupervisor from "../middlewares/verifyAuthAdmManagerSupervisor";
import verifyAuthAdmSupervisor from "../middlewares/verifyAuthAdmSupervisor";

const routes = Router();

export const agreementRoutes = () => {
  routes.get("", verifyAuthToken, verifyAuthAllNotHR, listAgreementController);
  routes.post(
    "",
    verifyAuthToken,
    verifyAuthAllNotHR,
    createAgreementController
  );
  routes.get(
    "/:id",
    verifyAuthToken,
    verifyAuthAllNotHR,
    listOneAgreementController
  );
  routes.patch(
    "/:id",
    verifyAuthToken,
    verifyAuthAdmManagerSupervisor,
    updateAgreementController
  );
  routes.delete(
    "/:id",
    verifyAuthToken,
    verifyAuthAdmManagerSupervisor,
    deleteAgreementController
  );
  routes.get(
    "/bank/:id",
    verifyAuthToken,
    verifyAuthAdmSupervisor,
    listAgreementByBankController
  );
  routes.get(
    "/client/:id",
    verifyAuthToken,
    verifyAuthAllNotHR,
    listAgreementByClientController
  );
  routes.get(
    "/user/:id",
    verifyAuthToken,
    verifyAuthAllNotHR,
    listAgreementByUserController
  );
  return routes;
};
