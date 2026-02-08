import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { PAYMENTS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
 constructor(
 private readonly reservationsRepository: ReservationsRepository,
 @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy, //the access modifier is needed in this shorthand, to fully declare it, otherwhise  it wont work 
 ){

 }


 async create(createReservationDto: CreateReservationDto, userId:string) {
    
  //NOTES - we had a subscribe block after the .send, but nest js subscribes to observables on it's own ? -so we changed .subscribe to .pipe
  
return  this.paymentsService.send('create_charge',createReservationDto.charge)
 .pipe(
  map(
  (res)=>{ // we subscribe to the microservice cuz it returns an observable and you subscribe to observables

  //console.log("INSIDE SUBSCRIBE BLOCK ,RESPONSE IS-->",response)
  return this.reservationsRepository.create({
    ...createReservationDto,
    invoice:res.id,
    timestamp:new Date(),
    userId:userId,
    
  });





 })
)




  }

 async findAll() {
    return this.reservationsRepository.find({});
  }

  async findOne(_id: string) {
    return this.reservationsRepository.findOne({_id});
  }

 async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      {_id},
      {$set:updateReservationDto}
    )
  }

 async remove(_id: string) {
    return this.reservationsRepository.findOneAndDelete({_id});
  }




}

