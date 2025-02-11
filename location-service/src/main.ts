import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  })
  await app.listen(3002, () => 
    console.log("location service run on port 3002")
  );
}
bootstrap();
