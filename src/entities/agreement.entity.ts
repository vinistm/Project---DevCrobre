import {
  Column,
  Entity,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import { Debts } from "./debt.entity";
import { Bank } from "./bank.entity";
import { Client } from "./client.entity";
import { User } from "./user.entity";

export enum FormOfPayment {
  AVISTA = "a vista",
  PARCELADO = "parcelado",
  ENTRADA = "entrada",
}

@Entity("agreement")
export class Agreement {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  agreedvalue: number;

  @Column()
  dateagree: Date;

  @Column()
  status: boolean;

  @Column({
    type: "simple-enum",
    enum: FormOfPayment,
    default: FormOfPayment.AVISTA,
  })
  formOfPayment: FormOfPayment;

  @Column({ nullable: true })
  valueEntry: string;

  @Column({ nullable: true })
  installments: string;

  @OneToOne(() => Debts, (debts) => debts.id)
  @JoinColumn()
  debts: Debts;

  @ManyToOne(() => Bank, (bank) => bank.id)
  bank: Bank;

  @ManyToOne(() => Client, (client) => client.document)
  client: Client;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
