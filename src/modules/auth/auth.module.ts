import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserMongoRepository } from 'src/infra/database/mongodb/repositories/user.repository';
import { LoginUseCase } from 'src/@core/auth/use-cases/login.usecase';
import { UserRepository } from 'src/@core/user/repositories/user.repository';
import { UserSchema } from 'src/infra/database/mongodb/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: 'jwt-secret', // 🔐 substituir por env variável
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'UserRepository',
      useClass: UserMongoRepository,
    },
    {
      provide: LoginUseCase,
      useFactory: (repo: UserRepository, jwt: JwtService) => {
        return new LoginUseCase(repo, jwt);
      },
      inject: ['UserRepository', JwtService],
    },
  ],
})
export class AuthModule {}
