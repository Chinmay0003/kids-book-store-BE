import { Column, Entity, OneToOne } from "typeorm";
import { IBookMetadata } from "~src/svc/modules/book/types";
import { Metadata } from "~src/svc/modules/common/entities";
import { Book } from "~src/svc/modules/book/entities";

@Entity({ name: "book_metadata" })
export class BookMetadata extends Metadata {
  @Column({ type: "text" })
  summary!: string;

  @Column({ type: "jsonb", nullable: true })
  defaultKeywords!: string[] | null;

  @OneToOne(() => Book, (book: Book) => book.bookMetadata)
  book?: Book;
}
