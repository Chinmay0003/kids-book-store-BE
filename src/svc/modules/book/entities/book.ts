import { Column, Entity, Index, OneToMany } from "typeorm";
import { BookMedia } from "~src/svc/modules/book/entities/book-media";
import { IBookEnum } from "~src/svc/modules/book/enum";
import { IBookMetadata } from "~src/svc/modules/book/types";
import { Metadata } from "~src/svc/modules/common/entities";

@Entity({ name: "book" })
export class Book extends Metadata {
  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "enum", enum: IBookEnum })
	@Index()
  category!: IBookEnum;

	@Column({ type: "jsonb", nullable: true })
	metadata!: IBookMetadata;

  @Index()
  @Column({ type: "bool", default: false })
  isSold!: boolean;

	@Column({type: "integer"})
	price!: number;

	@OneToMany(() => BookMedia, (e) => e.book)
  bookMedia!: BookMedia[];
}
