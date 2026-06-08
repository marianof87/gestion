export abstract class SubscriptionPlan {
  constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly features: string[]
  ) {}

  public abstract getPlanDetails(): string;
}

export class FreePlan extends SubscriptionPlan {
  constructor() {
    super("Free Plan", 0, ["Basic access", "Standard support"]);
  }

  public getPlanDetails(): string {
    return `Plan: ${this.name} | Price: $${this.price}/mo | Features: ${this.features.join(", ")}`;
  }
}

export class PremiumPlan extends SubscriptionPlan {
  constructor() {
    super("Premium Plan", 29.99, ["Unrestricted access", "Priority support", "HD streaming", "Exclusive content"]);
  }

  public getPlanDetails(): string {
    return `Plan: ${this.name} | Price: $${this.price}/mo | Features: ${this.features.join(", ")}`;
  }
}

export class EnterprisePlan extends SubscriptionPlan {
  constructor() {
    super("Enterprise Plan", 99.99, ["All Premium features", "Dedicated account manager", "24/7 dedicated support", "Custom integrations"]);
  }

  public getPlanDetails(): string {
    return `Plan: ${this.name} | Price: $${this.price}/mo | Features: ${this.features.join(", ")}`;
  }
}
