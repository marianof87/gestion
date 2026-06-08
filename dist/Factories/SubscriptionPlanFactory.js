"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionPlanFactory = void 0;
const SubscriptionPlan_1 = require("../Models/SubscriptionPlan");
class SubscriptionPlanFactory {
    static createPlan(type) {
        switch (type) {
            case 'free':
                return new SubscriptionPlan_1.FreePlan();
            case 'premium':
                return new SubscriptionPlan_1.PremiumPlan();
            case 'enterprise':
                return new SubscriptionPlan_1.EnterprisePlan();
            default:
                const exhaustiveCheck = type;
                throw new Error(`Plan type not supported: ${exhaustiveCheck}`);
        }
    }
}
exports.SubscriptionPlanFactory = SubscriptionPlanFactory;
