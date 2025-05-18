import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateInvoiceDto } from '../dtos/create-invoice.dto';
import { InvoiceService } from '../services/invoice.service';
import { AuthUser } from 'src/@core/auth/types/auth-user.interface';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly service: InvoiceService) {}

  @Post()
  async create(@Body() dto: CreateInvoiceDto, @CurrentUser() user: AuthUser) {
    return this.service.createInvoice({ ...dto, tenantId: user.tenantId });
  }

  @Get()
  async list(@CurrentUser() user: AuthUser) {
    return this.service.listInvoices(user.tenantId);
  }
}
