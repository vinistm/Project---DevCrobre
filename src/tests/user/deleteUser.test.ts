import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import app from "../../app";
import request from "supertest";

describe("Testing DELETE method in /user", () => {
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

  let bank = {
    name: "tal",
  };
  let client = {};

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

  test("Trying to delete an user without a token", async () => {
    const response = await request(app).delete(`/user/${testRes1.body.id}`);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("message");
  });

  test("Trying to delete an user /user/:id", async () => {
    const response = await request(app)
      .delete(`/user/${testRes1.body.id}`)
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("message");

    // expect(newResponse.body).toEqual(
    //   expect.objectContaining({
    //     id: newResponse.body.id,
    //     name: deletedUser.name,
    //     email: deletedUser.email,
    //     created_at: newResponse.body.created_at,
    //     status: newResponse.status,
    //   })
    // );
  });

  test("Trying to delete an user that doesn't exist /user/:id", async () => {
    const response = await request(app)
      .delete("/user/9999")
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("message");
  });
});
