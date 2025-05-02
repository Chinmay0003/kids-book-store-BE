import { RazorpayClient } from "~src/clients/razorpay";
import { conf } from "~src/config/settings";
import { Book } from "~src/svc/modules/book/entities";

export const processPaymentInitialisationForBook = async (bookId: number) => {
    const bookRepository = conf.DEFAULT_DATA_SOURCE.getRepository(Book);
    const requiredBook = await bookRepository.findOne({
        where: {
            id: bookId,
        },
    });
    if (requiredBook === null) {
        return;
    }
    const razorpayClient = new RazorpayClient();
    const currentOrder = await razorpayClient.createOrder(requiredBook.price);
    return {
        ...currentOrder,
        razorpayKeyId: conf.RAZORPAY_KEY_ID,
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
