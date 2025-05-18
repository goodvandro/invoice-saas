import { Injectable } from '@nestjs/common';
import { TenantDocument } from '../schemas/tenant.schema';
import { TenantRepository } from 'src/@core/tenant/repositories/tenant.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tenant } from 'src/@core/tenant/entities/tenant';

@Injectable()
export class TenantMongoRepository implements TenantRepository {
  constructor(
    @InjectModel('Tenant')
    private readonly tenantModel: Model<TenantDocument>,
  ) {}

  async create(tenant: Tenant): Promise<Tenant> {
    const created = await this.tenantModel.create({
      _id: tenant.id,
      name: tenant.name,
      identifier: tenant.identifier,
      createdAt: tenant.createdAt,
    });

    return new Tenant(created._id, created.name, created.identifier, created.createdAt);
  }

  async findById(id: string): Promise<Tenant | null> {
    const tenant = await this.tenantModel.findById(id);
    if (!tenant) return null;

    return new Tenant(tenant._id, tenant.name, tenant.identifier, tenant.createdAt);
  }

  async findByIdentifier(identifier: string): Promise<Tenant | null> {
    const tenant = await this.tenantModel.findOne({ identifier });
    if (!tenant) return null;

    return new Tenant(tenant._id, tenant.name, tenant.identifier, tenant.createdAt);
  }
}
