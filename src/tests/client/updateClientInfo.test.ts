import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../app";

describe("Testing PATCH method in /client/:document/info/:idContact", () => {
  let connection: DataSource;

  interface Client {
    document: string;
    name: string;
    type: string;
  }

  interface InfoClient {
    telephone: number;
    email: string;
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

  let testClient: Client = {
    document: "12345678910",
    name: "Client Test",
    type: "Físico",
  };

  let testInfo: InfoClient = {
    telephone: 12345678901,
    email: "client@mail.com",
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
  let responseInfo: any;
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
      .send(testClient);
    responseInfo = await request(app)
      .post(`/client/${response.body.document}/info`)
      .set("Authorization", `Bearer ${token}`)
      .send(testInfo);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Trying to update a client's information", async () => {
    const responseGet = await request(app)
      .get(`/client/${response.body.document}/info`)
      .set("Authorization", `Bearer ${tokenResponse}`);

    const info = responseGet.body.clientInfo[0].id;

    const responsePatch = await request(app)
      .patch(`/client/${response.body.document}/info/${info}`)
      .set("Authorization", `Bearer ${tokenResponse}`)
      .send(testInfo.email);

    expect(responsePatch.status).toEqual(200);
    expect(responsePatch.body).toHaveProperty("message");

    expect(responseGet.body).toEqual(
      expect.objectContaining({
        document: response.body.document,
        name: response.body.name,
        type: response.body.type,
        clientInfo: [
          {
            id: info,
            telephone: responseGet.body.clientInfo[0].telephone,
            email: testInfo.email,
          },
        ],
      })
    );
  });

  test("Trying to update missing information from an existing client", async () => {
    const responseAdm = await request(app)
      .post("/adm/ti/create/user")
      .send(admUser);

    const loginAdm = await request(app).post("/login").send(admLogin);
    const { token } = loginAdm.body;

    const responsePatch = await request(app)
      .patch(`/client/${response.body.document}/info/0`)
      .set("Authorization", `Bearer ${token}`)
      .send(testInfo.email);

    expect(responsePatch.status).toEqual(400);
    expect(responsePatch.body).toHaveProperty("message");
  });

  test("Trying to update information for a client that does not exist", async () => {
    const responseAdm = await request(app)
      .post("/adm/ti/create/user")
      .send(admUser);

    const loginAdm = await request(app).post("/login").send(admLogin);
    const { token } = loginAdm.body;

    const response = await request(app)
      .patch("/client/1/info/0")
      .set("Authorization", `Bearer ${token}`)
      .send(testInfo);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("message");
  });
});
