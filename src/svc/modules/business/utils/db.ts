import { conf } from "~src/config/settings";
import { Business } from "~src/svc/modules/business/entities/business";
import { BusinessTypeEnum } from "~src/svc/modules/business/enums";

export const fetchAllBusinessFromDb = async (businessId?: number) => {
  const businessRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Business);
  return await businessRepo.find({
    ...(businessId
      ? {
          where: {
            id: businessId,
          },
        }
      : {}),
  });
};

export const postNewBusinessToDB = async (
  name: string,
  address: string,
  phone: string,
  type: string,
  defaultCut: number,
) => {
  const businessRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Business);
  return await businessRepo.save({
    name,
    address,
    phone,
    type: type as BusinessTypeEnum,
    defaultCut,
  });
};

export const updateBusinessToDB = async (
  businessId: number,
  name?: string,
  address?: string,
  phone?: string,
  type?: string,
  defaultCut?: number,
) => {
  const businessRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Business);
  return await businessRepo.save({
    id: businessId,
    ...(name ? { name } : {}),
    ...(address ? { address } : {}),
    ...(phone ? { phone } : {}),
    ...(type ? { type: type as BusinessTypeEnum } : {}),
    ...(defaultCut ? { defaultCut } : {}),
  });
};

export const deleteBusinessFromDB = async (businessId: number) => {
  const businessRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Business);
  return await businessRepo.delete({
    id: businessId,
  });
};
