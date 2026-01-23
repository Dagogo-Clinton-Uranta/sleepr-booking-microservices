import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ReservationDocument, ReservationSchema } from './models/reservation.schema';
import { ReservationsRepository } from './reservations.repository';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi'


@Module({
  imports:[DatabaseModule,      // static, already defined module
    DatabaseModule.forFeature([{  // dynamically generated module
     name:ReservationDocument.name,
     schema:ReservationSchema
    }]),
    LoggerModule, //from @app/common , as we moved the pino import
    ConfigModule.forRoot({
      isGlobal:true, //dont just set EVERYTHING GLOBALLY WILLY NILLY AS THE DOCUMENTATION POINTS OUT
      validationSchema:Joi.object({
        MONGODB_URI:Joi.string().required(),
        PORT:Joi.number().required(),
      })
    })
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService,ReservationsRepository],
})
export class ReservationsModule {}
