import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TenantHeaderMiddleware } from './common/middlewares/tenant-header.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // eslint-disable-next-line @typescript-eslint/unbound-method
  app.use(new TenantHeaderMiddleware().use); // ✅ Middleware global
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
