import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Book } from "~src/svc/modules/book/entities/book";
import { MediaTypeEnum } from "~src/svc/modules/book/enum";
import { IBookMediaMetadata } from "~src/svc/modules/book/types";
import { Metadata } from "~src/svc/modules/common/entities";

@Entity({ name: "book-media" })
export class BookMedia extends Metadata {
  @Column({ type: "jsonb", nullable: true })
  metadata!: IBookMediaMetadata;

  @Index()
  @Column({ type: "enum", enum: MediaTypeEnum })
  type!: MediaTypeEnum;

  @ManyToOne("Book", (e: Book) => e.bookMedia, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "bookId" })
  book!: Book;
}
