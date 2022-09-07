import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import request from "supertest";
import { FormOfPayment } from "../../entities/agreement.entity";

describe("Testing POST method in /agreement", () => {
  let connection: DataSource;

  interface IBank {
    id?: number;
    name: string;
    status: boolean;
  }

  interface IUser {
    id?: number;
    token?: string;
    name: string;
    email: string;
    password: string;
    position: string;
    telephone?: number;
    address?: string;
    status?: boolean;
  }

  interface IClient {
    document: string;
    name: string;
    type: string;
  }

  interface IDebts {
    id?: number;
    bankId?: number;
    documentClient: string;
    ipoc: string;
    debtValue: number;
    debtOrigin: number;
    debtType: string;
    dateDebt: Date;
  }

  interface IAgreement {
    id?: number;
    agreedValue: number;
    dateAgree: Date;
    status: boolean;
    debts?: number;
    bank?: number;
    client?: string;
    user?: number;
    formOfPayment: FormOfPayment;
    installments: string;
    valueEntry: string;
  }

  // Test Bank

  let testBank: IBank = {
    name: "Banco Test Agreement",
    status: true,
  };

  // Test User

  let testAdm: IUser = {
    telephone: 123456789,
    address: "Address",
    email: "user.adm@agreement.com",
    name: "User Test ADM",
    password: "Agreement123-",
    position: "ADM",
  };

  let testUser: IUser = {
    telephone: 123456789,
    address: "Address",
    email: "user@agreement.com",
    name: "User Test",
    password: "Agreement123-",
    position: "user",
  };

  // Test Client

  let testClient: IClient = {
    document: "123456789012",
    name: "Client Kenzie",
    type: "Fisico",
  };

  // Test Debts

  let testDebts: IDebts = {
    documentClient: "123456789012",
    debtType: "credito",
    debtValue: 1000,
    ipoc: "980000001",
    debtOrigin: 100,
    dateDebt: new Date(),
  };

  let testAgreement: IAgreement = {
    agreedValue: 100,
    dateAgree: new Date(),
    status: true,
    formOfPayment: FormOfPayment.ENTRADA,
    installments: "11x",
    valueEntry: "100",
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

  // Creating Agents

  describe("Creating Agents", () => {
    test("a) POST /adm/ti/create/user : Create Admin", async () => {
      const response = await request(app)
        .post("/adm/ti/create/user")
        .send(testAdm);
      expect(response.status).toEqual(201);
    });

    test("b) POST /login : Login Admin", async () => {
      const response = await request(app).post("/login").send(testAdm);

      testAdm.token = response.body.token;

      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty("token");
    });

    test("c) POST /user : Create User (by Admin)", async () => {
      const response = await request(app)
        .post("/user")
        .send(testUser)
        .set("Authorization", `Bearer ${testAdm.token}`);

      testUser.id = response.body.id;
      testAgreement.user = response.body.id;

      expect(response.status).toEqual(201);
      expect(response.body).toHaveProperty("id");
    });
  });

  describe("Creating Bank", () => {
    test("d) POST /bank : Create Bank", async () => {
      const response = await request(app)
        .post("/bank")
        .send(testBank)
        .set("Authorization", `Bearer ${testAdm.token}`);

      testBank.id = response.body.id;
      testDebts.bankId = response.body.id;
      testAgreement.bank = response.body.id;

      expect(response.status).toEqual(201);
      expect(response.body).toHaveProperty("id");
    });
  });

  describe("Creating Client", () => {
    test("e) POST /client : Create Client", async () => {
      const response = await request(app)
        .post("/client")
        .send(testClient)
        .set("Authorization", `Bearer ${testAdm.token}`);

      expect(response.status).toEqual(201);
    });
  });

  describe("Creating Debts", () => {
    test("f) POST /debts : Create Debts", async () => {
      const response = await request(app)
        .post("/debts")
        .send(testDebts)
        .set("Authorization", `Bearer ${testAdm.token}`);

      testDebts.id = response.body.id;
      testAgreement.debts = response.body.id;

      expect(response.status).toEqual(201);
      expect(response.body).toHaveProperty("id");
    });
  });

  describe("Creating Agreement", () => {
    test("g) POST /agreement : Create Agreement", async () => {
      const response = await request(app)
        .post("/agreement")
        .send(testAgreement)
        .set("Authorization", `Bearer ${testAdm.token}`);

      testAgreement.id = response.body.id;

      expect(response.status).toEqual(201);
      expect(response.body).toHaveProperty("id");
    });
  });
});
