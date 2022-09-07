import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./client.entity";

@Entity("client_info")
export class ClientInfo {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: true })
  telephone: number;

  @Column({ nullable: true, length: 256 })
  email: string;

  @ManyToOne(() => Client, (client) => client.document, {
    onDelete: "CASCADE",
  })
  client: Client;
}
