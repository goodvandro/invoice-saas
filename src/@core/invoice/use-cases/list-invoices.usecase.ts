import { Invoice } from '../entities/invoice.entity';
import { InvoiceRepository } from '../repositories/invoice.repository';

export class ListInvoicesUseCase {
  constructor(private readonly repo: InvoiceRepository) {}
  async execute(tenantId: string): Promise<Invoice[]> {
    return await this.repo.findAll(tenantId);
  }
}
