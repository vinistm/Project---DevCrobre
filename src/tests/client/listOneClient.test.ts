import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../app";

describe("Testing GET method in /client/:document", () => {
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
      .post("/client")
      .set("Authorization", `Bearer ${token}`)
      .send(testClient1);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Trying to list a specific client", async () => {
    const responseGet = await request(app)
      .get(`/client/${response.body.document}`)
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(responseGet.status).toEqual(200);
    expect(responseGet.body).toEqual(
      expect.objectContaining({
        document: response.body.document,
        name: response.body.name,
        type: response.body.type,
      })
    );
  });

  test("Trying to list a specific client that doesn't exist", async () => {
    const responseGet = await request(app)
      .get(`/client/1`)
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(responseGet.status).toEqual(404);
    expect(responseGet.body).toHaveProperty("message");
  });
});
