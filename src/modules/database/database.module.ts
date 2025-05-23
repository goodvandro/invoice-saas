// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IndexSyncService } from 'src/indexing/index-sync.service';
import { InvoiceSchema } from 'src/infra/database/mongodb/schemas/invoice.schema';
import { TenantSchema } from 'src/infra/database/mongodb/schemas/tenant.schema';
import { UserSchema } from 'src/infra/database/mongodb/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI', { infer: true }) || '', // fallback seguro
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Tenant', schema: TenantSchema },
      { name: 'Invoice', schema: InvoiceSchema },
    ]),
  ],
  providers: [IndexSyncService],
})
export class DatabaseModule {}
