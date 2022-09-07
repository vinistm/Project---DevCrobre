import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import request from "supertest";

describe("Testing PATCH method in /bank/:id/contact/:idContact", () => {
  let connection: DataSource;

  interface IBank {
    name: string;
    status: boolean;
  }

  interface IBankInfo {
    telephone: number;
    email: string;
  }

  let bank1: IBank = {
    name: "Banco 1",
    status: true,
  };

  let info1: IBankInfo = {
    telephone: 45612312,
    email: "bank@mail.com",
  };

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
      .post("/bank")
      .set("Authorization", `Bearer ${token}`)
      .send(bank1);
    responseInfo = await request(app)
      .post(`/bank/${response.body.id}/contact`)
      .set("Authorization", `Bearer ${token}`)
      .send(info1);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Trying to update a bank's contact", async () => {
    const responseGet = await request(app)
      .get(`/bank/${response.body.id}/contact`)
      .set("Authorization", `Bearer ${tokenResponse}`);

    const idContact = responseGet.body.bankContact[0].id;

    const responsePatch = await request(app)
      .patch(`/bank/${response.body.id}/contact/${idContact}`)
      .send(info1.email)
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(responsePatch.status).toEqual(200);
    expect(responsePatch.body).toHaveProperty("message");

    expect(responseGet.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        name: response.body.name,
        status: response.body.status,
        bankContact: [
          {
            id: idContact,
            telephone: responseGet.body.bankContact[0].telephone,
            email: info1.email,
          },
        ],
      })
    );
  });

  test("Trying to update missing information from an existing bank", async () => {
    const responsePatch = await request(app)
      .patch(`/bank/${response.body.id}/contact/0`)
      .set("Authorization", `Bearer ${tokenResponse}`)
      .send(info1.email);

    expect(responsePatch.status).toEqual(404);
    expect(responsePatch.body).toHaveProperty("message");
  });

  test("Trying to update information for a bank that does not exist", async () => {
    const response = await request(app)
      .patch("/bank/0/contact/0")
      .set("Authorization", `Bearer ${tokenResponse}`)
      .send(info1.email);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("message");
  });
});
