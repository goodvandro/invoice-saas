import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppModule } from 'src/app.module';
import { InvoiceDocument } from 'src/infra/database/mongodb/schemas/invoice.schema';
import { UserDocument } from 'src/infra/database/mongodb/schemas/user.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userModel = app.get<Model<UserDocument>>(getModelToken('User'));
  const invoiceModel = app.get<Model<InvoiceDocument>>(getModelToken('Invoice'));

  console.log('🔧 Creating indexes...');
  await userModel.createIndexes();
  await invoiceModel.createIndexes();
  console.log('✅ Indexes created.');

  await app.close();
}

bootstrap();
