"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterprisePlan = exports.PremiumPlan = exports.FreePlan = exports.SubscriptionPlan = void 0;
class SubscriptionPlan {
    name;
    price;
    features;
    constructor(name, price, features) {
        this.name = name;
        this.price = price;
        this.features = features;
    }
}
exports.SubscriptionPlan = SubscriptionPlan;
class FreePlan extends SubscriptionPlan {
    constructor() {
        super("Free Plan", 0, ["Basic access", "Standard support"]);
    }
    getPlanDetails() {
        return `Plan: ${this.name} | Price: $${this.price}/mo | Features: ${this.features.join(", ")}`;
    }
}
exports.FreePlan = FreePlan;
class PremiumPlan extends SubscriptionPlan {
    constructor() {
        super("Premium Plan", 29.99, ["Unrestricted access", "Priority support", "HD streaming", "Exclusive content"]);
    }
    getPlanDetails() {
        return `Plan: ${this.name} | Price: $${this.price}/mo | Features: ${this.features.join(", ")}`;
    }
}
exports.PremiumPlan = PremiumPlan;
class EnterprisePlan extends SubscriptionPlan {
    constructor() {
        super("Enterprise Plan", 99.99, ["All Premium features", "Dedicated account manager", "24/7 dedicated support", "Custom integrations"]);
    }
    getPlanDetails() {
        return `Plan: ${this.name} | Price: $${this.price}/mo | Features: ${this.features.join(", ")}`;
    }
}
exports.EnterprisePlan = EnterprisePlan;
