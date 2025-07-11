import { z } from "zod";
import {
  DeleteAddressSchema,
  GetCartPriceSchema,
  PostAdddAddressToDbSchema,
} from "~src/svc/modules/checkout/schemas";

export interface ICouponValidityCriteria {
  days?: number[];
  date?: string[];
}

export interface ICouponDiscountAmount {
  flatAmount?: number;
  percentage?: number;
}

export type PostAdddAddressToDbRequest = z.infer<typeof PostAdddAddressToDbSchema>;

export type DeleteAddressRequest = z.infer<typeof DeleteAddressSchema>;

export type GetCartPriceRequest = z.infer<typeof GetCartPriceSchema>;
