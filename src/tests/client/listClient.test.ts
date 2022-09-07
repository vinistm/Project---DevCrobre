import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import request from "supertest";

describe("Testing GET method in /client", () => {
  let connection: DataSource;

  interface Client {
    document: string;
    name: string;
    type: string;
  }

  interface User {
    name: string;
    email: string;
    password: string;
  }

  interface Login {
    email: string;
    password: string;
  }

  let testClient1: Client = {
    document: "12345678901",
    name: "Client TestUm",
    type: "Fisico",
  };

  let testClient2: Client = {
    name: "Client TestDois",
    document: "12345678912123",
    type: "Juridico",
  };

  let admUser: User = {
    name: "User Test Adm",
    email: "useradm@kenzie.com",
    password: "123456Ab!",
  };

  let admLogin: Login = {
    email: "useradm@kenzie.com",
    password: "123456Ab!",
  };

  let testRes1: any;
  let testRes2: any;
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

    testRes1 = await request(app)
      .post("/client")
      .set("Authorization", `Bearer ${token}`)
      .send(testClient1);
    testRes2 = await request(app)
      .post("/client")
      .set("Authorization", `Bearer ${token}`)
      .send(testClient2);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Trying to list an client", async () => {
    const response = await request(app)
      .get("/client")
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(2);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...testClient1,
        }),
        expect.objectContaining({
          ...testClient1,
        }),
      ])
    );
  });
});
