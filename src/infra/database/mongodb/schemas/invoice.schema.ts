import { Document, Schema } from 'mongoose';
import { BaseSchemaOptions } from './base.schema';

export interface InvoiceItemDocument {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceDocument extends Document {
  _id: string;
  tenantId: string;
  customerName: string;
  items: InvoiceItemDocument[];
  total: number;
  issuedAt: Date;
}

export const InvoiceItemSchema = new Schema<InvoiceItemDocument>(
  {
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
  },
  { _id: false },
);

export const InvoiceSchema = new Schema<InvoiceDocument>(
  {
    _id: { type: String, required: true },
    tenantId: { type: String, required: true, index: true },
    customerName: { type: String, required: true },
    items: { type: [InvoiceItemSchema], required: true },
    total: { type: Number, required: true },
    issuedAt: { type: Date, default: Date.now },
  },
  BaseSchemaOptions,
);
InvoiceSchema.index({ tenantId: 1, issuedAt: -1 });
InvoiceSchema.index({ tenantId: 1, customerName: 1 });
