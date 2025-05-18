import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TenantService } from '../services/tenant.service';
import { CreateTenantDto } from '../dtos/create-tenant.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tenants')
export class TenantController {
  constructor(private readonly service: TenantService) {}

  @Post()
  async create(@Body() dto: CreateTenantDto) {
    return this.service.createTenant(dto);
  }
}
