import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  })
  await app.listen(4000, () =>
    console.log("gateway run on port 4000")
  );
}
bootstrap();
