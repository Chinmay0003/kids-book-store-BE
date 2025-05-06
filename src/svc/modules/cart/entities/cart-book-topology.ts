import { Column, Entity, Index, ManyToOne, OneToMany } from "typeorm";
import { AppUser } from "~src/svc/modules/auth/entities/user";
import { Book } from "~src/svc/modules/book/entities";
import { Cart } from "~src/svc/modules/cart/entities/cart";
import { ICartStatusEnum } from "~src/svc/modules/cart/enums";
import { Metadata } from "~src/svc/modules/common/entities";

@Entity({ name: "cart_book_topology" })
export class CartBookTopology extends Metadata {
  @Index()
  @ManyToOne("Cart", (e: Cart) => e.cartBookTopology, {
    onDelete: "CASCADE",
  })
  cart!: Cart;

  @Index()
  @ManyToOne("Book", (e: Book) => e.cartBookTopology, {
    onDelete: "CASCADE",
  })
  book!: Book;
}
