export class User {
  constructor(
    public readonly id: string,
    public username: string,
    public email: string,
    public notificationPreference: 'email' | 'sms' | 'push',
    public isPremiumActive: boolean = false
  ) {}
}
