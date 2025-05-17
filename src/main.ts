import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TenantContextMiddleware } from './common/middlewares/tenant-context.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new TenantContextMiddleware().use);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
