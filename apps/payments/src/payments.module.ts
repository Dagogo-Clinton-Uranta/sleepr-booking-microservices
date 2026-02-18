import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule, NOTIFICATIONS_SERVICE } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal:true, //dont just set EVERYTHING GLOBALLY WILLY NILLY AS THE DOCUMENTATION POINTS OUT
    validationSchema:Joi.object({
      NOTIFICATIONS_HOST:Joi.string().required(),
      NOTIFICATIONS_PORT:Joi.number().required(),
      PORT:Joi.number().required(),
      STRIPE_SECRET_KEY:Joi.string().required(),
    })
  }),
  LoggerModule,
  ClientsModule.registerAsync([{
    name:NOTIFICATIONS_SERVICE,
    useFactory: (configService: ConfigService) => ({
     transport: Transport.TCP,
     options: {
      host:configService.get('NOTIFICATIONS_HOST'),
      port:configService.get('NOTIFICATIONS_PORT')
     }
    }),
    inject:[ConfigService]
  }])
],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
