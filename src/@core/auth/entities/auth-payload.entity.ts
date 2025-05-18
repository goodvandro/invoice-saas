export class AuthPayload {
  constructor(
    public readonly userId: string,
    public readonly tenantId: string,
    public readonly email: string,
    public readonly token: string,
  ) {}
}
