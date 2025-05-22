import { Schema, Document } from 'mongoose';
import { BaseSchemaOptions } from './base.schema';

export interface UserDocument extends Document {
  _id: string;
  tenantId: string;
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  roles?: string[];
}

export const UserSchema = new Schema<UserDocument>(
  {
    _id: { type: String, required: true },
    tenantId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  BaseSchemaOptions,
);

UserSchema.index(
  { tenantId: 1, email: 1 },
  // { unique: true, partialFilterExpression: { deletedAt: null } },
); // Garante email único por tenant
UserSchema.index({ tenantId: 1, createdAt: -1 }); // Index para ordenação
