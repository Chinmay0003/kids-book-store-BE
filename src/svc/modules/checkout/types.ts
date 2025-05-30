import { z } from "zod";
import { DeleteAddressSchema, PostAdddAddressToDbSchema } from "~src/svc/modules/checkout/schemas";

export type PostAdddAddressToDbRequest = z.infer<typeof PostAdddAddressToDbSchema>;

export type DeleteAddressRequest = z.infer<typeof DeleteAddressSchema>;