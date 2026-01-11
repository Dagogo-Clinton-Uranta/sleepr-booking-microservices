import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
    //for root is sort of like an initializer fir whatever we installed
    //in this case, for root, is telling nest js to load enviromnent variables from memory and read  dot envfiles
    imports: [NestConfigModule.forRoot({
        validationSchema:Joi.object({
            MONGODB_URI:Joi.string().required(), //validatin that mongoDB is a string
        })
    })] ,//we are setting our db in our config module here, for easy swappability
    providers: [ConfigService],
    exports: [ConfigService],
   

})
export class ConfigModule {

 

}
