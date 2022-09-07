import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import request from "supertest";
describe("Testing POST method in /client", () => {
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

  let testClient: Client = {
    document: "12345678901",
    name: "Client Test",
    type: "Fisico",
  };

  let testClient2: Client = {
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

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Trying to create an client", async () => {
    const response = await request(app)
      .post("/adm/ti/create/user")
      .send(admUser);
    const loginAdm = await request(app).post("/login").send(admLogin);
    const { token } = loginAdm.body;
    const resPost = await request(app)
      .post("/client")
      .set("Authorization", `Bearer ${token}`)
      .send(testClient);
    expect(resPost.status).toEqual(201);
    expect(resPost.body).toEqual(
      expect.objectContaining({
        document: resPost.body.document,
        name: resPost.body.name,
        type: resPost.body.type,
      })
    );
  });

  test("Trying to create an client that already exists", async () => {
    const response = await request(app)
      .post("/adm/ti/create/user")
      .send(admUser);

    const loginAdm = await request(app).post("/login").send(admLogin);
    const { token } = loginAdm.body;

    const resPost = await request(app)
      .post("/client")
      .set("Authorization", `Bearer ${token}`)
      .send(testClient);
    expect(resPost.status).toEqual(409);
    expect(resPost.body).toHaveProperty("message");
  });

  test("Trying to create a client with a document that already exists", async () => {
    const response = await request(app)
      .post("/adm/ti/create/user")
      .send(admUser);

    const loginAdm = await request(app).post("/login").send(admLogin);
    const { token } = loginAdm.body;
    const resPost = await request(app)
      .post("/client")
      .set("Authorization", `Bearer ${token}`)
      .send(testClient2);
    expect(resPost.status).toEqual(409);
    expect(resPost.body).toHaveProperty("message");
  });
});
