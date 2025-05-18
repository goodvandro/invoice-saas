import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InvoiceController } from './controllers/invoice.controller';
import { InvoiceService } from './services/invoice.service';
import { InvoiceSchema } from 'src/infra/database/mongodb/schemas/invoice.schema';
import { InvoiceMongoRepository } from 'src/infra/database/mongodb/repositories/invoice.repository';
import { CreateInvoiceUseCase } from 'src/@core/invoice/use-cases/create-invoice.usecase';
import { InvoiceRepository } from 'src/@core/invoice/repositories/invoice.repository';
import { ListInvoicesUseCase } from 'src/@core/invoice/use-cases/list-invoices.usecase';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Invoice', schema: InvoiceSchema }])],
  controllers: [InvoiceController],
  providers: [
    InvoiceService,
    {
      provide: 'InvoiceRepository',
      useClass: InvoiceMongoRepository,
    },
    {
      provide: CreateInvoiceUseCase,
      useFactory: (repo: InvoiceRepository) => new CreateInvoiceUseCase(repo),
      inject: ['InvoiceRepository'],
    },
    {
      provide: ListInvoicesUseCase,
      useFactory: (repo: InvoiceRepository) => new ListInvoicesUseCase(repo),
      inject: ['InvoiceRepository'],
    },
  ],
})
export class InvoiceModule {}
