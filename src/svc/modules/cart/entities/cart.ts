import { Column, Entity, Index, ManyToOne, OneToMany } from "typeorm";
import { AppUser } from "~src/svc/modules/auth/entities/user";
import { CartBookTopology } from "~src/svc/modules/cart/entities/cart-book-topology";
import { ICartStatusEnum } from "~src/svc/modules/cart/enums";
import { Address } from "~src/svc/modules/checkout/entities";
import { Metadata } from "~src/svc/modules/common/entities";

@Entity({ name: "cart" })
export class Cart extends Metadata {
  @Index()
  @ManyToOne("AppUser", (e: AppUser) => e.carts, {
    onDelete: "CASCADE",
  })
  appUser!: AppUser;

  @Column({ type: "enum", enum: ICartStatusEnum })
  @Index()
  status!: ICartStatusEnum;

  @OneToMany(() => CartBookTopology, (e) => e.cart)
  cartBookTopology!: CartBookTopology[];

  @Index()
  @ManyToOne("Address", (e: Address) => e.carts, {
    onDelete: "CASCADE",
  })
  address!: Address;
}
