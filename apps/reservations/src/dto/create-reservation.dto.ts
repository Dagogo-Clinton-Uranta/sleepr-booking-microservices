import { IsDate, IsNotEmpty, IsString } from "class-validator";



export class CreateReservationDto {

@IsDate() //please note that class-validator works in tandem with global pipe..if u are not using global pipes, it wont work
startDate: Date;

@IsDate()
endDate: Date;

@IsString()
@IsNotEmpty()
placeId: string;

@IsString()
@IsNotEmpty()
invoice: string;
}
