import { Column, Entity, ManyToOne, JoinColumn, OneToOne, Index } from "typeorm";
import { Metadata } from "~src/svc/modules/common/entities";
import { Book } from "~src/svc/modules/book/entities";
import { Business } from "~src/svc/modules/business/entities/business";

@Entity({ name: "business_book_topology" })
export class BusinessBookTopology extends Metadata {
  @Column({ type: "float", default: 20 })
  cut!: number;

  @Column({ type: "boolean", default: false })
  isPaymentRecieved!: boolean;

  @ManyToOne("Book", (e: Book) => e.businessBookTopology, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "bookId" })
  book!: Book;

  @Index()
  @OneToOne("Business", (e: Business) => e.businessBookTopology, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "businessId" })
  business!: Business;
}
