import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from 'src/@core/invoice/entities/invoice.entity';
import { InvoiceRepository } from 'src/@core/invoice/repositories/invoice.repository';
import { InvoiceDocument } from '../schemas/invoice.schema';
import { InvoiceItem } from 'src/@core/invoice/entities/invoice-item.entity';

@Injectable()
export class InvoiceMongoRepository implements InvoiceRepository {
  constructor(@InjectModel('Invoice') private readonly model: Model<InvoiceDocument>) {}

  async create(invoice: Invoice): Promise<Invoice> {
    await this.model.create({
      _id: invoice.id,
      tenantId: invoice.tenantId,
      customerName: invoice.customerName,
      items: invoice.items,
      total: invoice.total,
      issuedAt: invoice.issuedAt,
    });
    return invoice;
  }
  async findById(id: string, tenantId: string): Promise<Invoice | null> {
    const doc = await this.model.findOne({ _id: id, tenantId });
    if (!doc) return null;

    return new Invoice(
      doc._id,
      doc.tenantId,
      doc.customerName,
      doc.items.map((i) => new InvoiceItem(i.description, i.quantity, i.unitPrice)),
      doc.total,
      doc.issuedAt,
    );
  }

  async findAll(tenantId: string): Promise<Invoice[]> {
    const docs = await this.model.find({ tenantId });

    return docs.map(
      (doc) =>
        new Invoice(
          doc._id,
          doc.tenantId,
          doc.customerName,
          doc.items.map((i) => new InvoiceItem(i.description, i.quantity, i.unitPrice)),
          doc.total,
          doc.issuedAt,
        ),
    );
  }
}
