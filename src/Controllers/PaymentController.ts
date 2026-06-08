import { PaymentService } from '../Services/PaymentService';

export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  public pay(payload: { userId: string; amount: number }) {
    try {
      const { userId, amount } = payload;
      if (!userId || amount === undefined) {
        return { success: false, error: "Missing required fields: userId or amount." };
      }
      const invoice = this.paymentService.processPayment(userId, amount);
      return { success: true, data: invoice };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}
