import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Debts } from "./debt.entity";
import { User } from "./user.entity";

@Entity()
export class ContactHistory {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "boolean", default: false })
  agreement: boolean;

  @Column()
  date_contact: Date;

  @Column({ length: 500 })
  note: string;

  @ManyToOne(() => User, (user) => user.id)
  users: User[];

  @ManyToOne(() => Debts, (debts) => debts.id)
  debts: Debts[];
}
