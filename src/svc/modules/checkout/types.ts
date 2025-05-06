import { z } from "zod";
import { PostAdddAddressToDbSchema } from "~src/svc/modules/checkout/schemas";

export type PostAdddAddressToDbRequest = z.infer<typeof PostAdddAddressToDbSchema>;
