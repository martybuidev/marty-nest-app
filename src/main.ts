import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';
import { ConfigService } from '@/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(ConfigService).app;
  await app.listen(appConfig.port);
}
void bootstrap();
