import { SubscriptionPlan, FreePlan, PremiumPlan, EnterprisePlan } from '../Models/SubscriptionPlan';

export class SubscriptionPlanFactory {
  public static createPlan(type: 'free' | 'premium' | 'enterprise'): SubscriptionPlan {
    switch (type) {
      case 'free':
        return new FreePlan();
      case 'premium':
        return new PremiumPlan();
      case 'enterprise':
        return new EnterprisePlan();
      default:
        const exhaustiveCheck: never = type;
        throw new Error(`Plan type not supported: ${exhaustiveCheck}`);
    }
  }
}
