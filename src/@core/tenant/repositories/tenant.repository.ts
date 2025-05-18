import { Tenant } from '../entities/tenant';

export interface TenantRepository {
  create(tenant: Tenant): Promise<Tenant>;
  findByIdentifier(identifier: string): Promise<Tenant | null>;
  findById(id: string): Promise<Tenant | null>;
}
