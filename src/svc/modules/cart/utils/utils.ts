import { In } from "typeorm";
import { conf } from "~src/config/settings";
import { Book } from "~src/svc/modules/book/entities";
import { updateBookDataInDb } from "~src/svc/modules/book/utils/utils";
import { Cart, CartBookTopology } from "~src/svc/modules/cart/entities";
import { ICartStatusEnum } from "~src/svc/modules/cart/enums";

export const getCurrentActiveCartForUser = async (userId: number) => {
  const cartRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Cart);
  const cartBookTopologyRepo = conf.DEFAULT_DATA_SOURCE.getRepository(CartBookTopology);
  const currCarts = await cartRepo.find({
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
  let currCart = currCarts.find(e=>e.status === ICartStatusEnum.ACTIVE) ?? null;
  if (currCart === null) {
    await cartRepo.save({
      appUser: {
        id: userId,
      },
      status: ICartStatusEnum.ACTIVE,
    });
    currCart = await cartRepo.findOne({
      where: {
        appUser: {
          id: userId,
        },
        status: ICartStatusEnum.ACTIVE,
      },
      relations: {
        cartBookTopology: {
          book: {
            bookMedia: true,
          },
        },
      },
    });
  }
  if (currCart) {
    const soldBooks = currCart.cartBookTopology.filter(e=>e.book.isSold === true);
    if (soldBooks.length > 0) {
      await cartBookTopologyRepo.delete(soldBooks.map(e=>e.id));
      currCart = await cartRepo.findOne({
        where: {
          id: currCart.id,
          status: ICartStatusEnum.ACTIVE,
        },
        relations: {
          cartBookTopology: {
            book: {
              bookMedia: true,
            },
          },
        },
      });
    }
  }
  const unpaidBlockedCart = currCarts.find(e=>e.status === ICartStatusEnum.UNPAID_BLOCK);
  const paidBlockedCart = currCarts.find(e=>e.status === ICartStatusEnum.PAID_BLOCK);
  return {
    ...currCart,
    unpaidBlockedCart,
    paidBlockedCart,
  };
};

export const addBookToCartForUser = async (userId: number, bookId: number, cartStatus = ICartStatusEnum.ACTIVE) => {
  const cartRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Cart);
  const cartBookTopologyRepo = conf.DEFAULT_DATA_SOURCE.getRepository(CartBookTopology);
  let currCart = await cartRepo.findOne({
    where: {
      appUser: {
        id: userId,
      },
      status: cartStatus,
    },
  });
  if (currCart === null) {
    currCart = await cartRepo.save({
      appUser: {
        id: userId,
      },
      status: cartStatus,
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
  if (cartStatus === ICartStatusEnum.UNPAID_BLOCK) {
    await updateBookDataInDb({
      bookId,
      isSold: true,
    });
  }
};

export const updateCartWithBooksInDb = async (userId: number, bookIds: number[], cartType = ICartStatusEnum.ACTIVE) => {
  const cartRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Cart);
  const bookRepo = conf.DEFAULT_DATA_SOURCE.getRepository(Book);
  const cartBookTopologyRepo = conf.DEFAULT_DATA_SOURCE.getRepository(CartBookTopology);
  let currCart = await cartRepo.findOne({
    where: {
      appUser: {
        id: userId,
      },
      status: cartType,
    },
  });
  if (currCart === null) {
    await cartRepo.save({
      appUser: {
        id: userId,
      },
      status: cartType,
    });
    currCart = await cartRepo.findOne({
      where: {
        appUser: {
          id: userId,
        },
        status: cartType,
      },
    });
  }
  if (currCart === null) {
    return;
  }
  const currTopologies = await cartBookTopologyRepo.find({
    where: {
      cart: {
        id: currCart.id,
      },
    },
    relations: {
      book: true,
    }
  });
  if (currTopologies.length > 0) {
    if (cartType === ICartStatusEnum.UNPAID_BLOCK) {
      await bookRepo.save(currTopologies.map(e=> ({
        ...e.book,
        isSold: false,
      })));
    }
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
  if (cartType === ICartStatusEnum.UNPAID_BLOCK) {
    const updatedBooks = await bookRepo.find({
      where: {
        id: In(bookIds),
      },
    });
    await bookRepo.save(updatedBooks.map(e=>({
      ...e,
      isSold: true,
    })));
  }
};
