import { Column, Entity, Index, ManyToOne, OneToMany } from "typeorm";
import { AppUser } from "~src/svc/modules/auth/entities/user";
import { BookMedia } from "~src/svc/modules/book/entities/book-media";
import { IBookEnum, IBookQualityEnum, IBookTypeEnum } from "~src/svc/modules/book/enum";
import { IBookMetadata } from "~src/svc/modules/book/types";
import { Cart, CartBookTopology } from "~src/svc/modules/cart/entities";
import { IAddressCountryEnum } from "~src/svc/modules/checkout/enums";
import { Metadata } from "~src/svc/modules/common/entities";

@Entity({ name: "address" })
export class Address extends Metadata {
  @Column({ type: "varchar", length: 255 })
  firstName!: string;

  @Column({ type: "varchar", length: 255 })
  lastName!: string;

  @Column({ type: "enum", enum: IAddressCountryEnum })
  country!: IAddressCountryEnum;

  @Column({ type: "text" })
  streetAddress!: string;

  @Column({ type: "varchar", length: 255 })
  city!: string;

  @Column({ type: "varchar", length: 255 })
  state!: string;

  @Column({ type: "integer" })
  pincode!: number;

  @Column({ type: "varchar", length: 255 })
  phoneNumber!: string;

  @Index()
  @ManyToOne(() => AppUser, (e: AppUser) => e.addresses, {
    onDelete: "CASCADE",
    nullable: false,
  })
  appUser!: AppUser;

  @OneToMany(() => Cart, (e) => e.address)
  carts!: Cart[];
}
