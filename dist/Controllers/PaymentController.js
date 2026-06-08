"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
class PaymentController {
    paymentService;
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    pay(payload) {
        try {
            const { userId, amount } = payload;
            if (!userId || amount === undefined) {
                return { success: false, error: "Missing required fields: userId or amount." };
            }
            const invoice = this.paymentService.processPayment(userId, amount);
            return { success: true, data: invoice };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
}
exports.PaymentController = PaymentController;
