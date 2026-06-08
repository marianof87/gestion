"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryDatabase = void 0;
// Database Singleton for persistency simulation
class InMemoryDatabase {
    static instance = null;
    users = new Map();
    subscriptions = new Map();
    invoices = [];
    metrics = new Map([
        ["totalRevenue", 0],
        ["activeSubscriptions", 0],
        ["totalPaymentsProcessed", 0]
    ]);
    constructor() { }
    static getInstance() {
        if (!InMemoryDatabase.instance) {
            InMemoryDatabase.instance = new InMemoryDatabase();
        }
        return InMemoryDatabase.instance;
    }
    // User persistence methods
    getUsers() {
        return this.users;
    }
    // Subscription persistence methods
    getSubscriptions() {
        return this.subscriptions;
    }
    // Invoice persistence methods
    getInvoices() {
        return this.invoices;
    }
    addInvoice(invoice) {
        this.invoices.push(invoice);
    }
    // Metrics methods
    getMetric(key) {
        return this.metrics.get(key) || 0;
    }
    setMetric(key, value) {
        this.metrics.set(key, value);
    }
    incrementMetric(key, value = 1) {
        const current = this.getMetric(key);
        this.metrics.set(key, current + value);
    }
    /**
     * Resets the database. Useful for clean slate testing.
     */
    reset() {
        this.users.clear();
        this.subscriptions.clear();
        this.invoices = [];
        this.metrics.set("totalRevenue", 0);
        this.metrics.set("activeSubscriptions", 0);
        this.metrics.set("totalPaymentsProcessed", 0);
    }
}
exports.InMemoryDatabase = InMemoryDatabase;
