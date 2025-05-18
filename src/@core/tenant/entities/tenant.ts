export class Tenant {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly identifier: string,
    public readonly createdAt: Date = new Date(),
  ) {}
}
