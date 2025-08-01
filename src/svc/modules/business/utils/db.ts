import { conf } from "~src/config/settings";
import { BusinessBookTopology } from "~src/svc/modules/business/entities";
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

export const fetchAllBusinessTopologyFromDb = async (businessId: number) => {
  const businessRepo = conf.DEFAULT_DATA_SOURCE.getRepository(BusinessBookTopology);
  return await businessRepo.find({
    where: {
      business: { id: businessId },
    },
    relations: {
      book: true,
      business: true,
    },
  });
};

export const postBusinessTopologyToDB = async (
  businessId: number,
  bookId: number,
  cut: number,
) => {
  const businessRepo = conf.DEFAULT_DATA_SOURCE.getRepository(BusinessBookTopology);
  console.log(businessId, bookId, cut);
  return await businessRepo.save({
    business: { id: businessId },
    book: { id: bookId },
    cut,
  });
};
