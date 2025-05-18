import { randomUUID } from 'crypto';
import { Tenant } from '../entities/tenant';
import { TenantRepository } from '../repositories/tenant.repository';

export class CreateTenantUseCase {
  constructor(private readonly repo: TenantRepository) {}

  async execute(input: { name: string; identifier: string }): Promise<Tenant> {
    const existing = await this.repo.findByIdentifier(input.identifier);
    if (existing) {
      throw Error('Tenant already exists');
    }

    const tenant = new Tenant(randomUUID(), input.name, input.identifier);
    return this.repo.create(tenant);
  }
}
