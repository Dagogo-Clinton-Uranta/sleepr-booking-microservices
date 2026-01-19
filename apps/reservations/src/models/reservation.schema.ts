import { AbstractDocument } from "@app/common/database/abstract.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({versionKey:false})
export class ReservationDocument extends AbstractDocument {

@Prop() //this is for nest js to know its a mongoose schema property
timestamp:Date;

@Prop()
startDate:Date;

@Prop()
endDate:Date;

@Prop()
userId: string;
placeId:string;
invoice:string;


}


export const ReservationSchema  = SchemaFactory.createForClass(ReservationDocument)
