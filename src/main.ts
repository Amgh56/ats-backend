import * as dotenv from 'dotenv';
dotenv.config()

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';



async function bootstrap() {
  const app = await NestFactory.create(AppModule); 

  const config = new DocumentBuilder()
    .setTitle('ATS API Documentation')
    .setDescription('API documentation for the Applicant Tracking System')
    .setVersion('1.0')
    .addBearerAuth()  // adding the authorize token in swagger in here 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 
  // setting global pipes for DTO 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        
      forbidNonWhitelisted: true, 
      transform: true,         
    })
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server running on port ${process.env.PORT}`);
}
bootstrap();
