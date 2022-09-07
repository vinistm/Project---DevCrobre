import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../app";

describe("Testing GET method in /client/:document/info", () => {
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

  let admUser: User = {
    name: "User Test Adm",
    email: "useradm@kenzie.com",
    password: "123456Ab!",
  };

  let admLogin: Login = {
    email: "useradm@kenzie.com",
    password: "123456Ab!",
  };

  let client1: Client = {
    document: "12345678910",
    name: "Client Test",
    type: "Físico",
  };

  let client2: Client = {
    document: "44564564561235",
    name: "Client TestDois",
    type: "Jurídico",
  };

  let info1: InfoClient = {
    telephone: 12345678901,
    email: "client@mail.com",
  };

  let info2: InfoClient = {
    telephone: 965412365,
    email: "client2@mail.com",
  };

  let responseClient1: any;
  let responseClient2: any;
  let responseInfo1: any;
  let responseInfo2: any;
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

    responseClient1 = await request(app)
      .post("/client")
      .set("Authorization", `Bearer ${token}`)
      .send(client1);
    responseInfo1 = await request(app)
      .post(`/client/${responseClient1.body.document}/info`)
      .set("Authorization", `Bearer ${token}`)
      .send(info1);
    responseInfo2 = await request(app)
      .post(`/client/${responseClient1.body.document}/info`)
      .set("Authorization", `Bearer ${token}`)
      .send(info2);
    responseClient2 = await request(app)
      .post("/client")
      .set("Authorization", `Bearer ${token}`)
      .send(client2);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Trying to list a client and their information", async () => {
    const responseGet = await request(app)
      .get(`/client/${responseClient1.body.document}/info`)
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(responseGet.status).toEqual(200);
    expect(responseGet.body).toEqual(
      expect.objectContaining({
        document: responseClient1.body.document,
        name: responseClient1.body.name,
        type: responseClient1.body.type,
        clientInfo: [
          {
            id: responseGet.body.clientInfo[0].id,
            telephone: responseGet.body.clientInfo[0].telephone,
            email: responseGet.body.clientInfo[0].email,
          },
          {
            id: responseGet.body.clientInfo[1].id,
            telephone: responseGet.body.clientInfo[1].telephone,
            email: responseGet.body.clientInfo[1].email,
          },
        ],
      })
    );
  });

  test("Trying to list a client with no information", async () => {
    const responseGet = await request(app)
      .get(`/client/${responseClient2.body.document}/info`)
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(responseGet.status).toEqual(200);
    expect(responseGet.body).toEqual(
      expect.objectContaining({
        document: responseGet.body.document,
        name: responseGet.body.name,
        type: responseGet.body.type,
      })
    );
  });

  test("Trying to list a client that doesn't exist with information", async () => {
    const response = await request(app)
      .get("/client/1/info")
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("message");
  });
});
