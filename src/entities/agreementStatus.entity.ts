import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Agreement } from "./agreement.entity";
import { Bank } from "./bank.entity";

@Entity("agreement_status")
export class AgreementStatus {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  status: boolean;

  @OneToOne(() => Agreement, (agreement) => agreement.id)
  agreement_id: Agreement;

  @OneToOne(() => Bank, (bank) => bank.id)
  bank: Bank;
}
