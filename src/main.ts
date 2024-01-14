import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  SWAGGER_API_NAME,
  SWAGGER_API_DESCRIPTION,
  SWAGGER_API_CURRENT_VERSION,
  SWAGGER_API_ROOT,
} from './constants';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove all properties that are not in the DTO
    }),
  );
  await app.listen(3333);
}
bootstrap();
