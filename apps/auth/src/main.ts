import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);  //this allows us retrieve any injectable as mike guay said


  app.connectMicroservice({transport:Transport.TCP,
    options:{
      host: '0.0.0.0',
      port:configService.get('TCP_PORT')
    }
   })
   app.use(cookieParser())
   app.useGlobalPipes(new ValidationPipe({whitelist:true}))
   app.useLogger(app.get(Logger));
  
   
    await app.startAllMicroservices(); //to start our microservice up over this TCP transport layer
  await app.listen(configService.get('HTTP_PORT') );

  //we have connected a microservice here as well as cllaed app.listen for http connections - it is a hybrid app now
  // so bothe the app and the microservice will record starting successfully in the terminal

}
bootstrap();
