import { Column, Entity, OneToMany } from "typeorm";
import { Cart } from "~src/svc/modules/cart/entities";
import { Metadata } from "~src/svc/modules/common/entities";

@Entity({ name: "app_user" })
export class AppUser extends Metadata {
  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  googleId!: string | null;

  @Column({ type: "varchar", length: 255 })
  email!: string;

  @OneToMany(() => Cart, (e) => e.appUser)
  carts!: Cart[];
}
