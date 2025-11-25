import * as dotenv from 'dotenv';
dotenv.config()

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


/**
 * 
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule); // create Nest application in here 
  // setting global pipes for DTO 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        
      forbidNonWhitelisted: true, 
      transform: true,         
    })
  );
  //Http server 
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server running on port ${process.env.PORT}`);
}
bootstrap();// we start the app in here 
