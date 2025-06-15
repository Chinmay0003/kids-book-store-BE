import Razorpay from "razorpay";
import { conf } from "~src/config/settings";

export class RazorpayClient {
  #client: Razorpay;

  constructor() {
    this.#client = new Razorpay({
      key_id: conf.RAZORPAY_KEY_ID,
      key_secret: conf.RAZORPAY_KEY_SECRET,
    });
  }

  async createOrder(amount: number) {
    const order = await this.#client.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: "receipt_order_123",
    });
    return order;
  }
}
