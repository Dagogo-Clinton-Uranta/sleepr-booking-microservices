import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

@Module({
    //for root is sort of like an ainitializer
    imports: [MongooseModule.forRootAsync({
      imports:[ConfigModule], 
      inject:[ConfigService] ,//the list of dependecies we need available to actually run this useFactory function
         useFactory:(configService:ConfigService)=>({
        uri: configService.get('MONGODB_URI')  //configService above is using .env internally
    })
     
    
    
    }),

],
 //we changed from forRoot to forRootAsync - forRootAsync allows us to inject depencies into a factory method
 //and that means we will get access to config service - i dont understand how using a factory method, allows access to the config service

})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]){
    return MongooseModule.forFeature(models);
  }
}
