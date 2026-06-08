import { SubscriptionPlan } from './SubscriptionPlan';

// Subscription Model entity
export class Subscription {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public plan: SubscriptionPlan,
    public status: 'active' | 'suspended' | 'cancelled',
    public startDate: Date = new Date(),
    public nextBillingDate: Date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  ) {}
}
