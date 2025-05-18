import { Invoice } from '../entities/invoice.entity';

export interface InvoiceRepository {
  create(invoice: Invoice): Promise<Invoice>;
  findById(id: string, tenantId: string): Promise<Invoice | null>;
  findAll(tenantId: string): Promise<Invoice[]>;
}
