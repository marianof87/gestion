import { IPaymentObserver, PaymentEventPayload } from './IPaymentObserver';
import { InMemoryDatabase } from '../Config/InMemoryDatabase';

export class MetricsServiceObserver implements IPaymentObserver {
  private db = InMemoryDatabase.getInstance();

  public onPaymentSuccess(payload: PaymentEventPayload): void {
    const { amount } = payload;
    this.db.incrementMetric("totalRevenue", amount);
    this.db.incrementMetric("totalPaymentsProcessed", 1);
    console.log(`[Metrics Service]: Updated metrics. Total Revenue: $${this.db.getMetric("totalRevenue")}, Payments count: ${this.db.getMetric("totalPaymentsProcessed")}`);
  }
}
