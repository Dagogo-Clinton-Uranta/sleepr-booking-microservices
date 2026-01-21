import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
 
  //non defualt stuff
  app.useGlobalPipes(new ValidationPipe({whitelist: true})) //we use global pipes for system wide validation...using nest js class-validator and class transformer
  app.useLogger(app.get(Logger)) 
 //non default stuff - end

  await app.listen(process.env.port ?? 3000);
}


bootstrap();
