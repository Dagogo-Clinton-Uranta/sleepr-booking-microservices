import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    //for root is sort of like an ainitializer
    imports: [MongooseModule.forRoot('')]
})
export class DatabaseModule {}
