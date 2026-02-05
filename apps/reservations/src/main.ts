import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
 
  //non defualt stuff
  app.connectMicroservice({transport: Transport.TCP})
  app.useGlobalPipes(new ValidationPipe({whitelist: true})) //we use global pipes for system wide validation...using nest js class-validator and class transformer
  app.useLogger(app.get(Logger)) 
  app.use(cookieParser())

 //non default stuff - end

  await app.listen(process.env.port ?? 3000);

  const configService = app.get(ConfigService);  //this allows us retrieve any injectable as mike guay said

  await app.listen(configService.get('PORT') );
}


bootstrap();
