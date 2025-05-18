import { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  _id: string;
  tenantId: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export const UserSchema = new Schema<UserDocument>({
  _id: { type: String, required: true },
  tenantId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Garante email único por tenant
UserSchema.index({ email: 1, tenantId: 1 }, { unique: true });
