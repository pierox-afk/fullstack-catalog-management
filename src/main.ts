import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Choppi MVP')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  // Cast to any to avoid type mismatches when multiple @nestjs packages are resolved
  const doc = SwaggerModule.createDocument(app as any, config as any);
  SwaggerModule.setup('docs', app as any, doc as any);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
