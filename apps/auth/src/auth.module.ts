import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { LoggerModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi'
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UsersModule,LoggerModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService)=>({
        secret:configService.get<string>('JWT_SECRET'),
         signOptions: {
           expiresIn: `${configService.get('JWT_EXPIRATION')}s`
         }
      }),
      inject:[ConfigService], //we can inject config service into the JWT module..its different from injecting a repository into a service/or injecting a service into a controller
    }),
    ConfigModule.forRoot({
      isGlobal:true, //dont just set EVERYTHING GLOBALLY WILLY NILLY AS THE DOCUMENTATION POINTS OUT
      validationSchema:Joi.object({
        MONGODB_URI:Joi.string().required(),
        JWT_SECRET:Joi.string().required(), //we are using joi
        JWT_EXPIRATION:Joi.string(),
        HTTP_PORT:Joi.number().required(),
        TCP_PORT:Joi.number().required(),
      })
    }),
  

  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy],
})
export class AuthModule {}
