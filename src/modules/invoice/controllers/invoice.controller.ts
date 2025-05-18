import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateInvoiceDto } from '../dtos/create-invoice.dto';
import { InvoiceService } from '../services/invoice.service';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly service: InvoiceService) {}

  @Post()
  async create(@Body() dto: CreateInvoiceDto, @Req() req: Request) {
    const tenantId = req.tenantId;
    if (!tenantId) {
      throw new Error('Missing tenant context');
    }

    return this.service.createInvoice({ ...dto, tenantId });
  }
}
