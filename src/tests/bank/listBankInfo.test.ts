import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import request from "supertest";

describe("Testing GET method in /bank/:id/contact", () => {
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

  let bank2: IBank = {
    name: "Banco 2",
    status: true,
  };

  let info1: IBankInfo = {
    telephone: 45612312,
    email: "bank@mail.com",
  };

  let info2: IBankInfo = {
    telephone: 9995555,
    email: "bank2@mail.com",
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

  let responseBank1: any;
  let responseBank2: any;
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

    responseBank1 = await request(app)
      .post("/bank")
      .set("Authorization", `Bearer ${token}`)
      .send(bank1);
    responseInfo1 = await request(app)
      .post(`/bank/${responseBank1.body.id}/contact`)
      .set("Authorization", `Bearer ${token}`)
      .send(info1);
    responseInfo2 = await request(app)
      .post(`/bank/${responseBank1.body.id}/contact`)
      .set("Authorization", `Bearer ${token}`)
      .send(info2);
    responseBank2 = await request(app)
      .post("/bank")
      .set("Authorization", `Bearer ${token}`)
      .send(bank2);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Trying to list a bank and their contacts", async () => {
    const responseGet = await request(app)
      .get(`/bank/${responseBank1.body.id}/contact`)
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(responseGet.status).toEqual(200);
    expect(responseGet.body).toEqual(
      expect.objectContaining({
        id: responseBank1.body.id,
        name: responseBank1.body.name,
        status: responseBank1.body.status,
        bankContact: [
          {
            id: responseGet.body.bankContact[0].id,
            telephone: responseGet.body.bankContact[0].telephone,
            email: responseGet.body.bankContact[0].email,
          },
          {
            id: responseGet.body.bankContact[1].id,
            telephone: responseGet.body.bankContact[1].telephone,
            email: responseGet.body.bankContact[1].email,
          },
        ],
      })
    );
  });

  test("Trying to list a bank with no information", async () => {
    const responseGet = await request(app)
      .get(`/bank/${responseBank2.body.id}/contact`)
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(responseGet.status).toEqual(200);
    expect(responseGet.body).toEqual(
      expect.objectContaining({
        id: responseGet.body.id,
        name: responseGet.body.name,
        status: responseGet.body.status,
      })
    );
  });

  test("Trying to list a bank that doesn't exist with contact", async () => {
    const response = await request(app)
      .get("/bank/0/contact")
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("message");
  });
});
