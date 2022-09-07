import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import request from "supertest";

describe("Testing PATCH method in /bank/:id", () => {
  let connection: DataSource;

  interface IBank {
    name: string;
    status: boolean;
  }

  let bank1: IBank = {
    name: "Banco 1",
    status: true,
  };

  interface User {
    name: string;
    email: string;
    password: string;
  }

  interface Login {
    email: string;
    password: string;
  }

  let admUser: User = {
    name: "User Test Adm",
    email: "useradm@kenzie.com",
    password: "123456Ab!",
  };

  let admLogin: Login = {
    email: "useradm@kenzie.com",
    password: "123456Ab!",
  };

  let response: any;
  let tokenResponse: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    const responseAdm = await request(app)
      .post("/adm/ti/create/user")
      .send(admUser);
    const loginAdm = await request(app).post("/login").send(admLogin);
    const { token } = loginAdm.body;
    tokenResponse = token;

    response = await request(app)
      .post("/bank")
      .set("Authorization", `Bearer ${token}`)
      .send(bank1);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Trying to update a bank", async () => {
    const responsePatch = await request(app)
      .patch(`/bank/${response.body.id}`)
      .set("Authorization", `Bearer ${tokenResponse}`)
      .send(bank1);

    expect(responsePatch.status).toEqual(200);
    expect(responsePatch.body).toHaveProperty("message");
  });

  test("Try to update a bank that doesn't exist", async () => {
    const response = await request(app)
      .patch("/bank/0")
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("message");
  });
});
