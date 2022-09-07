import { MigrationInterface, QueryRunner } from "typeorm";

export class client1660154868686 implements MigrationInterface {
    name = 'client1660154868686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bank_contact" ("id" SERIAL NOT NULL, "telephone" integer, "email" character varying(250), "bankId" integer, CONSTRAINT "PK_560afc59afe23697c93d7d3cedb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bank" ("id" SERIAL NOT NULL, "name" character varying(256) NOT NULL, "status" boolean NOT NULL, CONSTRAINT "UQ_11f196da2e68cef1c7e84b4fe94" UNIQUE ("name"), CONSTRAINT "PK_7651eaf705126155142947926e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client_info" ("id" SERIAL NOT NULL, "telephone" integer, "email" character varying(256), "clientDocument" character varying(20), CONSTRAINT "PK_09bdc12b41c346ad56afee8d6cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("document" character varying(20) NOT NULL, "name" character varying(250) NOT NULL, "type" character varying(16) NOT NULL, CONSTRAINT "PK_463cae6774e9b085ca966d89b4f" PRIMARY KEY ("document"))`);
        await queryRunner.query(`CREATE TABLE "user_info" ("id" SERIAL NOT NULL, "telephone" integer, "address" character varying, "email" character varying(251) NOT NULL, "password" character varying(250) NOT NULL, "status" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_273a06d6cdc2085ee1ce7638b24" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_position_enum" AS ENUM('ADM', 'HR', 'manager', 'supervisor', 'user')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(250) NOT NULL, "position" "public"."user_position_enum" NOT NULL DEFAULT 'user', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact_history" ("id" SERIAL NOT NULL, "agreement" boolean NOT NULL DEFAULT false, "date_contact" TIMESTAMP NOT NULL, "note" character varying(500) NOT NULL, "usersId" integer, "debtsId" integer, CONSTRAINT "PK_68d75ef80ec536aee6b570ebaa6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "form_of_payment" ("id" SERIAL NOT NULL, "cash_payment" boolean NOT NULL, "installments" boolean NOT NULL, "entry_installments" boolean NOT NULL, "entry" numeric(10,2) NOT NULL, "installments_times" integer NOT NULL, "values_installments" numeric(10,2) NOT NULL, "debtsId" integer, CONSTRAINT "PK_1dd0f0bb3c89aa8c142df4ec421" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."debts_debttype_enum" AS ENUM('credito', 'emprestimo')`);
        await queryRunner.query(`CREATE TABLE "debts" ("id" SERIAL NOT NULL, "ipoc" character varying NOT NULL, "debtValue" numeric(10,2) NOT NULL, "debtOrigin" numeric(10,2) NOT NULL, "debtType" "public"."debts_debttype_enum" NOT NULL DEFAULT 'credito', "registration" TIMESTAMP NOT NULL DEFAULT now(), "dateDebt" TIMESTAMP NOT NULL DEFAULT now(), "debtStatus" boolean NOT NULL DEFAULT true, "bankId" integer, "clientDocument" character varying(20), "userId" integer, CONSTRAINT "UQ_3f7e06cf1f1749e839819e7da24" UNIQUE ("ipoc"), CONSTRAINT "PK_4bd9f54aab9e59628a3a2657fa1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."agreement_formofpayment_enum" AS ENUM('a vista', 'parcelado', 'entrada')`);
        await queryRunner.query(`CREATE TABLE "agreement" ("id" SERIAL NOT NULL, "agreedvalue" numeric(10,2) NOT NULL, "dateagree" TIMESTAMP NOT NULL, "status" boolean NOT NULL, "formOfPayment" "public"."agreement_formofpayment_enum" NOT NULL DEFAULT 'a vista', "valueEntry" character varying, "installments" character varying, "debtsId" integer, "bankId" integer, "clientDocument" character varying(20), "userId" integer, CONSTRAINT "REL_8a2b2d36d07bcc8b5269109ead" UNIQUE ("debtsId"), CONSTRAINT "PK_e7537188219eeef56233a609753" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agreement_status" ("id" SERIAL NOT NULL, "status" boolean NOT NULL, CONSTRAINT "PK_cf9c90e3ff35b7a1f95de446fa8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bank_contact" ADD CONSTRAINT "FK_0fac1c00e6609d07e97d6e8aaf6" FOREIGN KEY ("bankId") REFERENCES "bank"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_info" ADD CONSTRAINT "FK_c038d22b950e35c6ad1290a2ac3" FOREIGN KEY ("clientDocument") REFERENCES "client"("document") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_info" ADD CONSTRAINT "FK_3a7fa0c3809d19eaf2fb4f65949" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contact_history" ADD CONSTRAINT "FK_5e8f0954a4a47d04a55eaab4231" FOREIGN KEY ("usersId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contact_history" ADD CONSTRAINT "FK_08f4261b0a814235bb17e1740eb" FOREIGN KEY ("debtsId") REFERENCES "debts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form_of_payment" ADD CONSTRAINT "FK_4e523705f18e45d4676137440b1" FOREIGN KEY ("debtsId") REFERENCES "debts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "debts" ADD CONSTRAINT "FK_43d88dc4d2fb333bb354f09f96f" FOREIGN KEY ("bankId") REFERENCES "bank"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "debts" ADD CONSTRAINT "FK_68e682e126fd42a7d242538b44a" FOREIGN KEY ("clientDocument") REFERENCES "client"("document") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "debts" ADD CONSTRAINT "FK_834960a509c776eb841644a9bac" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agreement" ADD CONSTRAINT "FK_8a2b2d36d07bcc8b5269109ead2" FOREIGN KEY ("debtsId") REFERENCES "debts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agreement" ADD CONSTRAINT "FK_656cf36173881bcf6d7c0824d64" FOREIGN KEY ("bankId") REFERENCES "bank"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agreement" ADD CONSTRAINT "FK_22a5713ff8c018770412559c51e" FOREIGN KEY ("clientDocument") REFERENCES "client"("document") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agreement" ADD CONSTRAINT "FK_9acc5bec5a804d0a7cc3f58d392" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agreement" DROP CONSTRAINT "FK_9acc5bec5a804d0a7cc3f58d392"`);
        await queryRunner.query(`ALTER TABLE "agreement" DROP CONSTRAINT "FK_22a5713ff8c018770412559c51e"`);
        await queryRunner.query(`ALTER TABLE "agreement" DROP CONSTRAINT "FK_656cf36173881bcf6d7c0824d64"`);
        await queryRunner.query(`ALTER TABLE "agreement" DROP CONSTRAINT "FK_8a2b2d36d07bcc8b5269109ead2"`);
        await queryRunner.query(`ALTER TABLE "debts" DROP CONSTRAINT "FK_834960a509c776eb841644a9bac"`);
        await queryRunner.query(`ALTER TABLE "debts" DROP CONSTRAINT "FK_68e682e126fd42a7d242538b44a"`);
        await queryRunner.query(`ALTER TABLE "debts" DROP CONSTRAINT "FK_43d88dc4d2fb333bb354f09f96f"`);
        await queryRunner.query(`ALTER TABLE "form_of_payment" DROP CONSTRAINT "FK_4e523705f18e45d4676137440b1"`);
        await queryRunner.query(`ALTER TABLE "contact_history" DROP CONSTRAINT "FK_08f4261b0a814235bb17e1740eb"`);
        await queryRunner.query(`ALTER TABLE "contact_history" DROP CONSTRAINT "FK_5e8f0954a4a47d04a55eaab4231"`);
        await queryRunner.query(`ALTER TABLE "user_info" DROP CONSTRAINT "FK_3a7fa0c3809d19eaf2fb4f65949"`);
        await queryRunner.query(`ALTER TABLE "client_info" DROP CONSTRAINT "FK_c038d22b950e35c6ad1290a2ac3"`);
        await queryRunner.query(`ALTER TABLE "bank_contact" DROP CONSTRAINT "FK_0fac1c00e6609d07e97d6e8aaf6"`);
        await queryRunner.query(`DROP TABLE "agreement_status"`);
        await queryRunner.query(`DROP TABLE "agreement"`);
        await queryRunner.query(`DROP TYPE "public"."agreement_formofpayment_enum"`);
        await queryRunner.query(`DROP TABLE "debts"`);
        await queryRunner.query(`DROP TYPE "public"."debts_debttype_enum"`);
        await queryRunner.query(`DROP TABLE "form_of_payment"`);
        await queryRunner.query(`DROP TABLE "contact_history"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_position_enum"`);
        await queryRunner.query(`DROP TABLE "user_info"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "client_info"`);
        await queryRunner.query(`DROP TABLE "bank"`);
        await queryRunner.query(`DROP TABLE "bank_contact"`);
    }

}
