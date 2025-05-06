import { conf } from "~src/config/settings";
import { Cart, CartBookTopology } from "~src/svc/modules/cart/entities";
import { ICartStatusEnum } from "~src/svc/modules/cart/enums";

export const getCurrentActiveCartForUser = async (userId: number) => {
  const cartRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Cart);
  return await cartRepo.find({
    where: {
      appUser: {
        id: userId,
      },
    },
    relations: {
      cartBookTopology: {
        book: {
          bookMedia: true,
        },
      },
    },
  });
};

export const addBookToCartForUser = async (userId: number, bookId: number) => {
  const cartRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Cart);
  const cartBookTopologyRepo = conf.DEFAULT_DATA_SOURCE.getRepository(CartBookTopology);
  let currCart = await cartRepo.findOne({
    where: {
      appUser: {
        id: userId,
      },
      status: ICartStatusEnum.ACTIVE,
    },
  });
  if (currCart === null) {
    currCart = await cartRepo.save({
      appUser: {
        id: userId,
      },
      status: ICartStatusEnum.ACTIVE,
    });
  }
  await cartBookTopologyRepo.save({
    cart: {
      id: currCart.id,
    },
    book: {
      id: bookId,
    },
  });
};

export const updateCartWithBooksInDb = async (userId: number, bookIds: number[]) => {
  const cartRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Cart);
  const cartBookTopologyRepo = conf.DEFAULT_DATA_SOURCE.getRepository(CartBookTopology);
  const currCart = await cartRepo.findOne({
    where: {
      appUser: {
        id: userId,
      },
      status: ICartStatusEnum.ACTIVE,
    },
  });
  if (currCart === null) {
    return;
  }
  const currTopologies = await cartBookTopologyRepo.find({
    where: {
      cart: {
        id: currCart.id,
      },
    },
  });
  if (currTopologies.length > 0) {
    await cartBookTopologyRepo.delete(currTopologies.map((e) => e.id));
  }
  await cartBookTopologyRepo.save(
    bookIds.map((book) => ({
      cart: {
        id: currCart.id,
      },
      book: {
        id: book,
      },
    })),
  );
};
