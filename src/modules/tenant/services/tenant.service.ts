import { Injectable } from '@nestjs/common';
import { CreateTenantUseCase } from 'src/@core/tenant/use-cases/create-tenant.usecase';

@Injectable()
export class TenantService {
  constructor(private readonly createTenantUseCase: CreateTenantUseCase) {}

  async createTenant(input: { name: string; identifier: string }) {
    return this.createTenantUseCase.execute(input);
  }
}
