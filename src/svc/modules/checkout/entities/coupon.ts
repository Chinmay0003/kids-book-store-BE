import { Column, Entity, Index, ManyToOne, OneToMany } from "typeorm";
import { AppUser } from "~src/svc/modules/auth/entities/user";
import { BookMedia } from "~src/svc/modules/book/entities/book-media";
import { IBookEnum, IBookQualityEnum, IBookTypeEnum } from "~src/svc/modules/book/enum";
import { IBookMetadata } from "~src/svc/modules/book/types";
import { Cart, CartBookTopology } from "~src/svc/modules/cart/entities";
import { IAddressCountryEnum } from "~src/svc/modules/checkout/enums";
import { ICouponDiscountAmount, ICouponValidityCriteria } from "~src/svc/modules/checkout/types";
import { Metadata } from "~src/svc/modules/common/entities";

@Entity({ name: "coupon" })
export class Coupon extends Metadata {
	@Column({ type: "varchar", length: 255 })
	@Index()
  name!: string;

  @Column({ type: "jsonb" })
  validityCriteria!: ICouponValidityCriteria;

  @Column({ type: "jsonb" })
  discountAmount!: ICouponDiscountAmount;

  @Column({ type: "bool", default: false })
  isActive!: boolean;

  @OneToMany(() => Cart, (e) => e.coupon)
  carts!: Cart[];
}
