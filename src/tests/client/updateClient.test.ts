import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../app";

describe("Testing PATCH method in /client/:document", () => {
  let connection: DataSource;

  interface UpdateClient {
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

  let testClient1: UpdateClient = {
    document: "12345678910",
    name: "Client Test",
    type: "Físico",
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

  test("Trying to update a client", async () => {
    const responsePatch = await request(app)
      .patch(`/client/${response.body.document}`)
      .set("Authorization", `Bearer ${tokenResponse}`)
      .send(testClient1.name);

    const responseGet = await request(app)
      .get(`/client/${response.body.document}`)
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(responsePatch.status).toEqual(200);
    expect(responsePatch.body).toHaveProperty("message");

    expect(responseGet.body).toEqual(
      expect.objectContaining({
        document: response.body.document,
        name: testClient1.name,
        type: response.body.type,
      })
    );
  });

  test("Trying to update a client that doesn't exist", async () => {
    const response = await request(app)
      .patch(`/client/1`)
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("message");
  });
});
