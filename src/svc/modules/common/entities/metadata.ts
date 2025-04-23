import { CreateDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class Metadata {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @CreateDateColumn({ type: "timestamp" })
  @Index()
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  @Index()
  updatedAt!: Date;
}
