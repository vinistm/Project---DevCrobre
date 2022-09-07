import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bank } from "./bank.entity";
import { Client } from "./client.entity";
import { ContactHistory } from "./contactHistory.entity";
import { User } from "./user.entity";
import { FormOfPayment } from "./formOfPayment.entity";

export enum DebtType {
  CREDITO = "credito",
  EMPRESTIMO = "emprestimo",
}

@Entity("debts")
export class Debts {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ unique: true })
  ipoc: string;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  debtValue: number;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  debtOrigin: number;

  @Column({ type: "simple-enum", enum: DebtType, default: DebtType.CREDITO })
  debtType: DebtType;

  @CreateDateColumn()
  registration: Date;

  @CreateDateColumn()
  dateDebt: Date;

  @Column({ type: "boolean", default: true })
  debtStatus: boolean;

  @ManyToOne(() => Bank, (bank) => bank.id)
  bank: Bank;

  @ManyToOne(() => Client, (client) => client.document)
  client: Client;

  @OneToMany(() => ContactHistory, (contactHistory) => contactHistory.id)
  contactHistory: ContactHistory[];

  @ManyToOne(() => User, (user) => user.debts)
  user: User;

  @OneToMany(() => FormOfPayment, (FormOfPayment) => FormOfPayment.id)
  FormOfPayment: FormOfPayment[];
}
