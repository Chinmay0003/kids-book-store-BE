import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, OneToOne } from "typeorm";
import { BookMedia } from "~src/svc/modules/book/entities/book-media";
import { BookMetadata } from "~src/svc/modules/book/entities/book-metadata";
import {
  IBookContentCategoryEnum,
  IBookEnum,
  IBookQualityEnum,
  IBookTypeEnum,
} from "~src/svc/modules/book/enum";
import { IBookMetadata } from "~src/svc/modules/book/types";
import { BusinessBookTopology } from "~src/svc/modules/business/entities/business-book-topology";
import { CartBookTopology } from "~src/svc/modules/cart/entities";
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

  @Index()
  @Column({ type: "bool", default: false })
  sendWhatsappMsg!: boolean;

  @Column({ type: "integer" })
  price!: number;

  @Column({ type: "enum", enum: IBookQualityEnum, nullable: true })
  quality!: IBookQualityEnum;

  @Column({ type: "enum", enum: IBookTypeEnum, nullable: true })
  type!: IBookTypeEnum;

  @Column({ type: "enum", enum: IBookContentCategoryEnum, nullable: true })
  contentCategory!: IBookContentCategoryEnum;

  @Column({ type: "bool", default: false })
  isBusinessBook!: boolean;

  @OneToMany(() => BookMedia, (e) => e.book)
  bookMedia!: BookMedia[];

  @OneToMany(() => CartBookTopology, (e) => e.book)
  cartBookTopology!: CartBookTopology[];

  @OneToOne(() => BusinessBookTopology, (e) => e.book)
  businessBookTopology!: BusinessBookTopology;

  @OneToOne("BookMetadata", (bookMetadata: BookMetadata) => bookMetadata.book, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "bookMetadataId" })
  bookMetadata!: BookMetadata;
}
