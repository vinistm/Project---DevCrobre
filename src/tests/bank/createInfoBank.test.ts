import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import request from "supertest";

describe("Testing POST method in /bank/:id/contact", () => {
  let connection: DataSource;

  interface IBank {
    name: string;
    status: boolean;
  }

  interface IBankInfo {
    telephone: number;
    email: string;
  }

  let bank1: IBank = {
    name: "Banco 1",
    status: true,
  };

  let info1: IBankInfo = {
    telephone: 45612312,
    email: "bank@mail.com",
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

  test("Trying to create info a bank", async () => {
    const responsePost = await request(app)
      .post(`/bank/${response.body.id}/contact`)
      .set("Authorization", `Bearer ${tokenResponse}`)
      .send(info1);

    expect(responsePost.status).toEqual(200);
    expect(responsePost.body).toHaveProperty("message");
  });

  test("Try to create contact for a bank that doesn't exist", async () => {
    const response = await request(app)
      .post("/bank/0/contact")
      .set("Authorization", `Bearer ${tokenResponse}`)
      .send(info1);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("message");
  });
});
