import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
} from "typeorm";
import { BankContact } from "./bankContact.entity";
import { Debts } from "./debt.entity";

@Entity("bank")
export class Bank {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 256, unique: true })
  name: string;

  @Column()
  status: boolean;

  @OneToMany(() => Debts, (debts) => debts.id)
  debts: Debts[];

  @OneToMany(() => BankContact, (bankContact) => bankContact.bank, {
    eager: true,
  })
  @JoinTable()
  bankContact: BankContact[];
}
