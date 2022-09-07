import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import request from "supertest";

describe("Testing GET method in /user", () => {
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

  let notAdmOne: User = {
    name: "User Test Not Adm",
    email: "usernotadm@kenzie.com",
    password: "123456Ab!",
    position: "user",
    telephone: "987654321",
    address: "Street test, 01",
  };

  let notAdmTwo: User = {
    name: "User Test Not Adm",
    email: "usernotadmtwo@kenzie.com",
    password: "123456Ab!",
    position: "user",
    telephone: "987654321",
    address: "Street test, 01",
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
      .post("/user")
      .set("Authorization", `Bearer ${token}`)
      .send(notAdmOne);

    testRes2 = await request(app)
      .post("/user")
      .set("Authorization", `Bearer ${token}`)
      .send(notAdmTwo);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Trying to list all users without a token", async () => {
    const response = await request(app).get("/user");

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("message");
  });

  test("Trying to list a single user without a token", async () => {
    const response = await request(app).get(`/user/${testRes1.body.id}`);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("message");
  });

  test("Testing list all users", async () => {
    const response = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(3);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: response.body[0].id,
          name: response.body[0].name,
          position: response.body[0].position,
        }),
        expect.objectContaining({
          id: response.body[1].id,
          name: response.body[1].name,
          position: response.body[1].position,
        }),
        expect.objectContaining({
          id: response.body[2].id,
          name: response.body[2].name,
          position: response.body[2].position,
        }),
      ])
    );
  });

  test("Testing to list a single user ", async () => {
    const response = await request(app)
      .get(`/user/${testRes1.body.id}`)
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        name: response.body.name,
        position: response.body.position,
        infos: {
          email: response.body.infos.email,
          telephone: response.body.infos.telephone,
          address: response.body.infos.address,
        },
      })
    );
  });

  test("Trying to list an user that doesn't exist", async () => {
    const response = await request(app)
      .get("/user/x2a")
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("message");
  });
});
