import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import request from "supertest";

describe("Testing GET method in /bank", () => {
  let connection: DataSource;

  interface IBank {
    name: string;
    status: boolean;
  }

  let bank1: IBank = {
    name: "Banco 1",
    status: true,
  };

  let bank2: IBank = {
    name: "Banco 2",
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

  let resBank1: any;
  let resBank2: any;
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

    resBank1 = await request(app)
      .post("/bank")
      .set("Authorization", `Bearer ${token}`)
      .send(bank1);
    resBank2 = await request(app)
      .post("/bank")
      .set("Authorization", `Bearer ${token}`)
      .send(bank2);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Testing list all banks", async () => {
    const response = await request(app)
      .get("/bank")
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(2);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...bank1,
          id: response.body[0].id,
        }),
        expect.objectContaining({
          ...bank2,
          id: response.body[1].id,
        }),
      ])
    );
  });
});
