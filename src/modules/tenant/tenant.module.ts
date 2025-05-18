import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantSchema } from 'src/infra/database/mongodb/schemas/tenant.schema';
import { TenantController } from './controllers/tenant.controller';
import { TenantService } from './services/tenant.service';
import { TenantMongoRepository } from 'src/infra/database/mongodb/repositories/tenant.repository';
import { CreateTenantUseCase } from 'src/@core/tenant/use-cases/create-tenant.usecase';
import { TenantRepository } from 'src/@core/tenant/repositories/tenant.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Tenant',
        schema: TenantSchema,
      },
    ]),
  ],
  controllers: [TenantController],
  providers: [
    TenantService,
    {
      provide: 'TenantRepository',
      useClass: TenantMongoRepository,
    },
    {
      provide: CreateTenantUseCase,
      useFactory: (repo: TenantRepository) => new CreateTenantUseCase(repo),
      inject: ['TenantRepository'],
    },
  ],
})
export class TenantModule {}
