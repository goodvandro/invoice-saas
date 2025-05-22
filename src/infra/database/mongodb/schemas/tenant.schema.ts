import { Document, Schema } from 'mongoose';
import { BaseSchemaOptions } from './base.schema';

export interface TenantDocument extends Document {
  _id: string;
  name: string;
  identifier: string;
  createdAt: Date;
}

export const TenantSchema = new Schema<TenantDocument>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    identifier: { type: String, required: true, unique: true, index: true },
    createdAt: { type: Date, default: Date.now },
  },
  BaseSchemaOptions,
);
