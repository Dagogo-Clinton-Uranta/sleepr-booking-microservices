import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    //for root is sort of like an ainitializer
    imports: [MongooseModule.forRootAsync({
        imports:[ConfigModule], //we cant use configService below without importing the ConfigModule, which houses the configService
         useFactory:(configService:ConfigService)=>({
       //configService above is using .env internally
        uri: configService.get('MONGODB_URI') /**connection string to be here */
      
    }),
      inject:[ConfigService] //the list of dependecies we need available to actually run this useFactory function
    
    
    }),

],
 //we changed from forRoot to forRootAsync - forRootAsync allows us to inject depencies into a factory method
 //and that means we will get access to config service - i dont understand how using a factory methos, allows access to the config service

})
export class DatabaseModule {}
