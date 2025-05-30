import { conf } from "~src/config/settings";
import { Cart } from "~src/svc/modules/cart/entities";
import { Address } from "~src/svc/modules/checkout/entities";
import { IAddressCountryEnum } from "~src/svc/modules/checkout/enums";

export const fetchAllAddressesForUser = async (userId: number) => {
  const adressRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Address);
  return await adressRepo.find({
    where: {
      appUser: {
        id: userId,
      },
    },
  });
};

export const addAddRessToDb = async (
  userId: number,
  addressData: {
    firstName: string;
    lastName: string;
    country: string;
    streetAddress: string;
    city: string;
    state: string;
    pincode: number;
    phoneNumber: string;
  },
) => {
  const addressRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Address);
  const newAddress = await addressRepo.save({
    appUser: {
      id: userId,
    },
    firstName: addressData.firstName,
    lastName: addressData.lastName,
    country: addressData.country as IAddressCountryEnum,
    streetAddress: addressData.streetAddress,
    city: addressData.city,
    state: addressData.state,
    pincode: addressData.pincode,
    phoneNumber: addressData.phoneNumber,
  });
  return newAddress.id;
};

export const assignAddressToCart = async (cartId: number, addressId: number) => {
  const cartRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Cart);
  await cartRepo.update(cartId, {
    address: {
      id: addressId,
    },
  });
};

export const deleteAddressForId = async (addressId: number) => {
  const addressRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Address);
  await addressRepo.delete(addressId);
};
