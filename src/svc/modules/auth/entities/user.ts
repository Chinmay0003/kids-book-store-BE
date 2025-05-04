import { Column, Entity } from "typeorm";
import { Metadata } from "~src/svc/modules/common/entities";

@Entity({ name: "app_user" })
export class AppUser extends Metadata {
  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  googleId!: string | null;

  @Column({ type: "varchar", length: 255 })
  email!: string;
}
