import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe'
import { CreateChargeDto } from '@app/common';

@Injectable()
export class PaymentsService {

  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
  {
    apiVersion:"2022-11-15"
  }
  )


  constructor(private readonly configService: ConfigService){}
//anything you declare in the scontructor argument(i.e, passed into the constructor), you can use it in the rest of the class..thats the point of the injection
  
 async createCharge(/*card:Stripe.PaymentMethodCreateParams.Card,amount:number*/ {/*card,*/amount}: CreateChargeDto){
 
 // const paymentMethod = await this.stripe.paymentMethods.create({
 // type:"card",
 // card,
 //})
 

 const paymentIntent = await this.stripe.paymentIntents.create({
  //payment_method:paymentMethod.id,
  payment_method:'pm_card_visa',
  amount:amount*100,
  confirm:true,
  //payment_method_types:['card'],
  currency:'gbp'
 });


 return paymentIntent

}

}
