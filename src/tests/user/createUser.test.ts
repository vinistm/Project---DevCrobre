import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import request from "supertest";

describe("Testing POST method in /user", () => {
  let connection: DataSource;

  interface User {
    name: string;
    email: string;
    password: string;
    position?: string;
    telephone?: string;
    address?: string;
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

  let notAdm: User = {
    name: "User Test Not Adm",
    email: "usernotadm@kenzie.com",
    password: "123456Ab!",
    position: "user",
    telephone: "987654321",
    address: "Street test, 01",
  };

  let admLogin: Login = {
    email: "useradm@kenzie.com",
    password: "123456Ab!",
  };

  let notAdmLogin: Login = {
    email: "usernotadm@kenzie.com",
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

  test("Trying to create an user without a token", async () => {
    const response = await request(app).post("/user/").send(notAdm);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("message");
  });

  test("Trying to create an user", async () => {
    const responseAdm = await request(app)
      .post("/adm/ti/create/user")
      .send(admUser);

    const loginAdm = await request(app).post("/login").send(admLogin);
    const { token } = loginAdm.body;

    const response = await request(app)
      .post("/user")
      .set("Authorization", `Bearer ${token}`)
      .send(notAdm);

    expect(response.status).toEqual(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        name: response.body.name,
        position: response.body.position,
        infos: {
          address: response.body.infos.address,
          email: response.body.infos.email,
          telephone: response.body.infos.telephone,
        },
      })
    );
  });
  test("Trying create an user that already exists", async () => {
    const loginAdm = await request(app).post("/login").send(admLogin);
    const { token } = loginAdm.body;

    const response = await request(app)
      .post("/user")
      .set("Authorization", `Bearer ${token}`)
      .send(notAdm);

    expect(response.status).toEqual(409);
    expect(response.body).toHaveProperty("message");
  });
});
