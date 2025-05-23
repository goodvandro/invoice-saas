import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserSchema } from 'src/infra/database/mongodb/schemas/user.schema';
import { UserMongoRepository } from 'src/infra/database/mongodb/repositories/user-mongo.repository';
import { CreateUserUseCase } from 'src/@core/user/use-cases/create-user.usecase';
import { UserRepository } from 'src/@core/user/repositories/user.repository';
import { ListUsersUseCase } from 'src/@core/user/use-cases/list-users.usecase';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserRepository',
      useClass: UserMongoRepository,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (repo: UserRepository) => new CreateUserUseCase(repo),
      inject: ['UserRepository'],
    },
    {
      provide: ListUsersUseCase,
      useFactory: (repo: UserRepository) => new ListUsersUseCase(repo),
      inject: ['UserRepository'],
    },
  ],
})
export class UserModule {}
