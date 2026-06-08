import { User } from '../Models/User';
import { Subscription } from '../Models/Subscription';
import { Invoice } from '../Models/Invoice';

// Database Singleton for persistency simulation
export class InMemoryDatabase {
  private static instance: InMemoryDatabase | null = null;

  private users: Map<string, User> = new Map();
  private subscriptions: Map<string, Subscription> = new Map();
  private invoices: Invoice[] = [];
  private metrics: Map<string, number> = new Map([
    ["totalRevenue", 0],
    ["activeSubscriptions", 0],
    ["totalPaymentsProcessed", 0]
  ]);

  private constructor() {}

  public static getInstance(): InMemoryDatabase {
    if (!InMemoryDatabase.instance) {
      InMemoryDatabase.instance = new InMemoryDatabase();
    }
    return InMemoryDatabase.instance;
  }

  // User persistence methods
  public getUsers(): Map<string, User> {
    return this.users;
  }

  // Subscription persistence methods
  public getSubscriptions(): Map<string, Subscription> {
    return this.subscriptions;
  }

  // Invoice persistence methods
  public getInvoices(): Invoice[] {
    return this.invoices;
  }

  public addInvoice(invoice: Invoice): void {
    this.invoices.push(invoice);
  }

  // Metrics methods
  public getMetric(key: string): number {
    return this.metrics.get(key) || 0;
  }

  public setMetric(key: string, value: number): void {
    this.metrics.set(key, value);
  }

  public incrementMetric(key: string, value: number = 1): void {
    const current = this.getMetric(key);
    this.metrics.set(key, current + value);
  }

  /**
   * Resets the database. Useful for clean slate testing.
   */
  public reset(): void {
    this.users.clear();
    this.subscriptions.clear();
    this.invoices = [];
    this.metrics.set("totalRevenue", 0);
    this.metrics.set("activeSubscriptions", 0);
    this.metrics.set("totalPaymentsProcessed", 0);
  }
}
