import { Router } from "express";
import listHistoryController from "../controllers/history/listHistory.controller";
import updateHistoryController from "../controllers/history/updateHistory.controller";
import deleteHistoryController from "../controllers/history/deleteHistory.controller";
import createHistoryController from "../controllers/history/createHistory.controller";
import schemaValidation from "../middlewares/schemaValidation";
import historySchema from "../schemas/history/history.schema";
import verifyAuthToken from "../middlewares/verifyAuthToken.middleware";
import verifyAuthAllNotHR from "../middlewares/verifyAuthAllNotHR";
import verifyAuthAdmSupervisor from "../middlewares/verifyAuthAdmSupervisor";

const routes = Router();

export const historyRoutes = () => {
  routes.get("", verifyAuthToken, verifyAuthAllNotHR, listHistoryController);
  routes.post(
    "",
    verifyAuthToken,
    verifyAuthAllNotHR,
    schemaValidation(historySchema),
    createHistoryController
  );
  routes.patch(
    "/:id",
    verifyAuthToken,
    verifyAuthAdmSupervisor,
    updateHistoryController
  );
  routes.delete(
    "/:id",
    verifyAuthToken,
    verifyAuthAdmSupervisor,
    deleteHistoryController
  );

  return routes;
};
