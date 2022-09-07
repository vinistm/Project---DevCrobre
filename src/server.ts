import app from "./app";
import { AppDataSource } from "./data-source";

const init = async () => {
  const PORT = process.env.PORT || 3000;

  await AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });

  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  });
};
init();
