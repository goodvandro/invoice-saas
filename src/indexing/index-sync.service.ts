import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvoiceDocument } from 'src/infra/database/mongodb/schemas/invoice.schema';
import { UserDocument } from 'src/infra/database/mongodb/schemas/user.schema';

@Injectable()
export class IndexSyncService implements OnApplicationBootstrap {
  private readonly logger = new Logger(IndexSyncService.name);

  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    @InjectModel('Invoice') private readonly invoiceModel: Model<InvoiceDocument>,
  ) {}

  async onApplicationBootstrap() {
    if (process.env.NODE_ENV === 'development') {
      this.logger.log('🔧 Syncing indexes in development...');
      await this.userModel.syncIndexes();
      await this.invoiceModel.syncIndexes();
      this.logger.log('✅ Indexes synced.');
    } else {
      this.logger.log('🚫 Skipping index sync in production.');
    }
  }
}
