import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../app";

describe("Testing GET method in /bank/:id", () => {
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

  test("Trying to list a specific bank", async () => {
    const responseGet = await request(app)
      .get(`/bank/${response.body.id}`)
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(responseGet.status).toEqual(200);
    expect(responseGet.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        name: response.body.name,
        status: response.body.status,
      })
    );
  });

  test("Trying to list a specific bank that doesn't exist", async () => {
    const responseGet = await request(app)
      .get(`/bank/0`)
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(responseGet.status).toEqual(404);
    expect(responseGet.body).toHaveProperty("message");
  });
});
