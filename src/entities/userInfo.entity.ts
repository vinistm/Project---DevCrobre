import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("user_info")
export class UserInfo {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "CASCADE",
  })
  user: User;

  @Column({ nullable: true })
  telephone: number;

  @Column({ nullable: true })
  address: string;

  @Column({ length: 251 })
  email: string;

  @Column({ length: 250 })
  @Exclude()
  password: string;

  @Column("boolean", { default: true })
  status: boolean = true;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
