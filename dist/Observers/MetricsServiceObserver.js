"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsServiceObserver = void 0;
const InMemoryDatabase_1 = require("../Config/InMemoryDatabase");
class MetricsServiceObserver {
    db = InMemoryDatabase_1.InMemoryDatabase.getInstance();
    onPaymentSuccess(payload) {
        const { amount } = payload;
        this.db.incrementMetric("totalRevenue", amount);
        this.db.incrementMetric("totalPaymentsProcessed", 1);
        console.log(`[Metrics Service]: Updated metrics. Total Revenue: $${this.db.getMetric("totalRevenue")}, Payments count: ${this.db.getMetric("totalPaymentsProcessed")}`);
    }
}
exports.MetricsServiceObserver = MetricsServiceObserver;
