import { Body, Controller, Post } from '@nestjs/common';
import { TenantService } from '../services/tenant.service';
import { CreateTenantDto } from '../dtos/create-tenant.dto';

@Controller('tenants')
export class TenantController {
  constructor(private readonly service: TenantService) {}

  @Post()
  async create(@Body() dto: CreateTenantDto) {
    return this.service.createTenant(dto);
  }
}
