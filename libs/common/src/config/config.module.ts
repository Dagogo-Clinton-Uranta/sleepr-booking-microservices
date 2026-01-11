import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
    //for root is sort of like an initializer fir whatever we installed
    //in this case, for root, is telling nest js to load enviromnent variables from memory and read  dot envfiles
    imports: [NestConfigModule.forRoot()] //we are setting our db in our config module here, for easy swappability


})
export class ConfigModule {

 

}
