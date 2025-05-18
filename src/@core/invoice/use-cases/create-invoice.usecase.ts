import { InvoiceRepository } from '../repositories/invoice.repository';
import { Invoice } from '../entities/invoice.entity';
import { InvoiceItem } from '../entities/invoice-item.entity';
import { randomUUID } from 'crypto';

export class CreateInvoiceUseCase {
  constructor(private readonly repo: InvoiceRepository) {}

  async execute(data: {
    tenantId: string;
    customerName: string;
    items: { description: string; quantity: number; unitPrice: number }[];
  }): Promise<Invoice> {
    const items = data.items.map(
      (item) => new InvoiceItem(item.description, item.quantity, item.unitPrice),
    );

    const total = items.reduce((sum, item) => sum + item.total, 0);

    const invoice = new Invoice(randomUUID(), data.tenantId, data.customerName, items, total);

    return this.repo.create(invoice);
  }
}
