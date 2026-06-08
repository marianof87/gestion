import { User } from '../Models/User';
import { Subscription } from '../Models/Subscription';
import { Invoice } from '../Models/Invoice';

export interface PaymentEventPayload {
  user: User;
  subscription: Subscription;
  invoice: Invoice;
  amount: number;
}

export interface IPaymentObserver {
  onPaymentSuccess(payload: PaymentEventPayload): void;
}
