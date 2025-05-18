import { InvoiceItem } from './invoice-item.entity';

export class Invoice {
  constructor(
    public readonly id: string,
    public readonly tenantId: string,
    public readonly customerName: string,
    public readonly items: InvoiceItem[],
    public readonly total: number,
    public readonly issuedAt: Date = new Date(),
  ) {}
}
