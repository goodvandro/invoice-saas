import { Injectable } from '@nestjs/common';
import { CreateInvoiceUseCase } from 'src/@core/invoice/use-cases/create-invoice.usecase';

@Injectable()
export class InvoiceService {
  constructor(private readonly createInvoiceUseCase: CreateInvoiceUseCase) {}

  async createInvoice(input: {
    tenantId: string;
    customerName: string;
    items: { description: string; quantity: number; unitPrice: number }[];
  }) {
    return this.createInvoiceUseCase.execute(input);
  }
}
