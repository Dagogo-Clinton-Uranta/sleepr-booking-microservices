import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  // const app = await NestFactory.create(PaymentsModule);
 
 
  //creating the app and then connecting the microservice is a hybrid approach..aps need to send out stuff to the real world via http, but communicate with each other via tcp of microservices
  const app = await NestFactory.create(NotificationsModule);
   const configService = app.get(ConfigService);  //this allows us retrieve any environment variable as mike guay said, its inside the app, so we app.get on COnfigService
 
 
   app.connectMicroservice({transport:Transport.TCP,
     options:{
       host: '0.0.0.0',
       port:configService.get('PORT') // so this is  app.get(configService).get('PORT') --> all this , just to get to your .env file in this module
     }
    })
    //app.use(cookieParser())
    //app.useGlobalPipes(new ValidationPipe({whitelist:true}))
    app.useLogger(app.get(Logger));
   
    
     await app.startAllMicroservices(); //to start our microservice up over this TCP transport layer
   //await app.listen(configService.get('PORT') ); //we not using the http part of this microservice/app hybrid
 
   await app.listen(process.env.port ?? 3000);
 }
 bootstrap();
