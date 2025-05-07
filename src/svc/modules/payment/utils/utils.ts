import { RazorpayClient } from "~src/clients/razorpay";
import { conf } from "~src/config/settings";
import { Book } from "~src/svc/modules/book/entities";
import { In } from "typeorm";

export const processPaymentInitialisationForBook = async (
  bookIds: number[],
  address: number,
) => {
  const bookRepository = conf.DEFAULT_DATA_SOURCE.getRepository(Book);

  const requiredBooks = await bookRepository.findBy({
    id: In(bookIds),
  });
  if (!requiredBooks.length) {
    return;
  }

  const amount = requiredBooks.reduce((sum, book) => sum + book.price, 0);

  const razorpayClient = new RazorpayClient();
  const currentOrder = await razorpayClient.createOrder(amount);

  return {
    ...currentOrder,
    shippingAddress: address,
    razorpayKeyId: conf.RAZORPAY_KEY_ID,
    items: requiredBooks.map((book) => ({
      id: book.id,
      price: book.price,
      isSold: true,
    })),
  };
};

export const markBookAsSold = async (bookId: number) => {
  const bookRepository = conf.DEFAULT_DATA_SOURCE.getRepository(Book);
  const requiredBook = await bookRepository.findOne({
    where: {
      id: bookId,
    },
  });
  if (requiredBook === null) {
    return;
  }
  await bookRepository.update(requiredBook.id, {
    isSold: true,
  });
};
