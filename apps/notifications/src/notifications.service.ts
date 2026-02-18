import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Injectable()
export class NotificationsService {

  async notifyEmail({email}: NotifyEmailDto){
    console.log(" IN NOTIFY EMAIL FUNCTION --->, EMAIL LOOKS LIKE",email)
  }
 
}
