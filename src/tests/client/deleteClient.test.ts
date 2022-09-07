import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import app from "../../app";
import request from "supertest";

describe("Testing DELETE method in /client/:document", () => {
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
    name: "Client TestDois",
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

  let testRes1: any;
  let tokenResponse: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during Data Source initialization", err)
      );

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
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Trying to delete a client", async () => {
    const response = await request(app)
      .delete(`/client/${testRes1.body.document}`)
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("message");
  });

  test("Trying to delete a client that doesn't exist", async () => {
    const response = await request(app)
      .delete(`/client/1`)
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("message");
  });
});
