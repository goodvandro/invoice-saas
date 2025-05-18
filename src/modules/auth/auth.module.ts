import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginUseCase } from 'src/@core/auth/use-cases/login.usecase';
import { UserRepository } from 'src/@core/user/repositories/user.repository';
import { TenantHeaderMiddleware } from 'src/common/middlewares/tenant-header.middleware';
import { UserMongoRepository } from 'src/infra/database/mongodb/repositories/user.repository';
import { UserSchema } from 'src/infra/database/mongodb/schemas/user.schema';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
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
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantHeaderMiddleware).forRoutes('auth/login', 'auth/refresh');
  }
}
