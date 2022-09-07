import { Express } from "express";
import { agreementRoutes } from "./agreement.routes";
import { bankRoutes } from "./bank.routes";
import { clientRoutes } from "./client.routes";
import { debtsRoutes } from "./debts.routes";
import { userRoutes } from "./user.routes";
import { formPaymentRoutes } from "./formPayment.routes";
import { historyRoutes } from "./history.routes";
import { sessionRoutes } from "./session.routes";
import { admRoutes } from "./adm.routes";

export const appRoutes = (app: Express) => {
  app.use("/adm", admRoutes());
  app.use("/login", sessionRoutes());
  app.use("/bank", bankRoutes());
  app.use("/agreement", agreementRoutes());
  app.use("/client", clientRoutes());
  app.use("/debts", debtsRoutes());
  app.use("/payment", formPaymentRoutes());
  app.use("/history", historyRoutes());
  app.use("/user", userRoutes());
};
