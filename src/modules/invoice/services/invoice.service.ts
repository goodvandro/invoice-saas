import { Injectable } from '@nestjs/common';
import { CreateInvoiceUseCase } from 'src/@core/invoice/use-cases/create-invoice.usecase';
import { ListInvoicesUseCase } from 'src/@core/invoice/use-cases/list-invoices.usecase';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly createInvoiceUseCase: CreateInvoiceUseCase,
    private readonly listInvoicesUseCase: ListInvoicesUseCase,
  ) {}

  async createInvoice(input: {
    tenantId: string;
    customerName: string;
    items: { description: string; quantity: number; unitPrice: number }[];
  }) {
    return this.createInvoiceUseCase.execute(input);
  }

  async listInvoices(tenantId: string) {
    return this.listInvoicesUseCase.execute(tenantId);
  }
}
