import { CreateChargeDto } from "@app/common";

import { Type } from "class-transformer";
import { IsDate, IsDefined, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString, ValidateNested } from "class-validator";



export class CreateReservationDto {

@IsDate() //please note that class-validator works in tandem with global pipe..if u are not using global pipes, it wont work
@Type(()=>Date)
startDate: Date;

@IsDate()
@Type(()=>Date)
endDate: Date;

@IsString()
@IsNotEmpty()
placeId: string;

@IsString()
@IsNotEmpty()
invoice: string;


@IsDefined()
@IsNotEmptyObject()
@ValidateNested()
charge:CreateChargeDto



}
