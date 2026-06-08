// Invoice Model entity representing a payment receipt
export class Invoice {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly subscriptionId: string,
    public readonly amount: number,
    public readonly issuedAt: Date = new Date(),
    public readonly status: 'paid' | 'failed' = 'paid'
  ) {}
}
