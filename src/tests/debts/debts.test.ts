import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import request from "supertest";
import { response } from "express";

describe("Testing POST method in /debts", () => {
  let connection: DataSource;

  interface User {
    name: string;
    email: string;
    password: string;
    position?: string;
    telephone?: string;
    address?: string;
  }

  interface Debts {
    bankId: number;
    dateDebt: string;
    debtOrigin: number;
    debtType: string;
    debtValue: number;
    documentClient: string;
    ipoc: number;
  }

  interface Login {
    email: string;
    password: string;
  }

  interface Bank {
    name: string;
    status: boolean;
  }

  interface Client {
    document: string;
    name: string;
    type: string;
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

  let notAdmOne: Login = {
    email: "usernotadmOne@kenzie.com",
    password: "123456Ab!",
  };

  let bank: Bank = {
    name: "Test Bank",
    status: true,
  };

  let notBank: Bank = {
    name: "Test not bank",
    status: true,
  };

  let client: Client = {
    document: "11111111111111",
    name: "Test Client",
    type: "Fisico",
  };

  let notClient: Client = {
    document: "11111111111111",
    name: "Test not Client",
    type: "Fisico",
  };

  let debt: Debts = {
    bankId: 1,
    dateDebt: "2020-01-01",
    debtOrigin: 500,
    debtType: "credito",
    debtValue: 1000,
    documentClient: "11111111111111",
    ipoc: 9992651,
  };

  let notDebt: Debts = {
    bankId: 1,
    dateDebt: "2020-01-01",
    debtOrigin: 500,
    debtType: "credito",
    debtValue: 1000,
    documentClient: "11111111111111",
    ipoc: 9992651,
  };

  let debts: any = { debts: ["1"] };

  let tokenResponse: any;

  let bankResponse: any;
  let clientResponse: any;
  let userResponse: any;
  let response: any;

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

    clientResponse = await request(app)
      .post("/client")
      .set("Authorization", `Bearer ${tokenResponse}`)
      .send(client);

    bankResponse = await request(app)
      .post("/bank")
      .set("Authorization", `Bearer ${tokenResponse}`)
      .send(bank);

    userResponse = await request(app)
      .post("/user")
      .set("Authorization", `Bearer ${tokenResponse}`)
      .send(notAdm);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("should be able to create a new debt", async () => {
    response = await request(app)
      .post("/debts")
      .set("Authorization", `Bearer ${tokenResponse}`)
      .send(debt);

    expect(response.status).toEqual(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        debtStatus: response.body.debtStatus,
        registration: response.body.registration,
        id: response.body.id,
        debtType: response.body.debtType,
        ipoc: response.body.ipoc,
        debtValue: response.body.debtValue,
        debtOrigin: response.body.debtOrigin,
        dateDebt: response.body.dateDebt,

        bank: {
          id: response.body.bank.id,
          name: response.body.bank.name,
          status: response.body.bank.status,
          bankContact: [],
        },
        client: {
          document: response.body.client.document,
          name: response.body.client.name,
          type: response.body.client.type,
          clientInfo: [],
        },
      })
    );
  });

  test("Try to create an debt that already exists", async () => {
    const response = await request(app)
      .post("/debts")
      .set("Authorization", `Bearer ${tokenResponse}`)
      .send(debt);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("message");
  });

  test("Try to list all debts", async () => {
    const responseDebt = await request(app)
      .get("/debts")
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(responseDebt.status).toEqual(200);
    expect(responseDebt.body.length).toEqual(1);
    expect(Array.isArray(responseDebt.body)).toBe(true);
  });

  test("Try to list my debts", async () => {
    const responseDebt = await request(app)
      .get("/user/debts/me")
      .set("Authorization", `Bearer ${tokenResponse}`);

    expect(responseDebt.status).toEqual(200);
    expect(responseDebt.body.length).toEqual(1);
    expect(Array.isArray(responseDebt.body)).toBe(true);
  });
});
