import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { writeFileSync } from 'fs';
import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap(): Promise<INestApplication> {
  const logger = new Logger('boostrap');
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api/products/v1');
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     whitelist: true,
  //   }),
  // );

  const config = new DocumentBuilder()
    .setTitle('Products-Service')
    .setDescription('API to handle everything related to products')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  const outputPath = path.resolve(process.cwd(), 'swagger.json');
  writeFileSync(outputPath, JSON.stringify(document, null, 4), {
    encoding: 'utf8',
  });

  if (process.env.DATABASE_MIGRATION !== 'true') {
    await app.listen(process.env.PORT);

    logger.log(`Application listening port: ${process.env.PORT}`);
  } else {
    logger.log('Close application due to migrations');
    await app.close();
    process.exit(0);
  }
  return app;
}
bootstrap().catch((error) => {
  console.log(error?.message, error?.stack);
});
