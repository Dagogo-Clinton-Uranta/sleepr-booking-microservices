import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { localAuthGuard } from './guards/local-auth-guard';
import { CurrentUser } from '../../../libs/common/src/decorators/current-user.decorator';
import { UserDocument } from './users/models/user.schema';

import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth-guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

@UseGuards(localAuthGuard)
@Post('login')
async login(
  @CurrentUser() user: UserDocument ,//argument 1
  @Res({passthrough:true}) response: Response  //argument 2
){
 await this.authService.login(user,response)

 response.send(user) // why are we doing this ?
}


@UseGuards(JwtAuthGuard) //guards work the same in microservices
@MessagePattern('authenticate')
  //message pattern allows us to accept incoming RTC calls on our chosen transport layer
async authenticate(@Payload() data:any){
return data.user
}




  @Get()
  getHello(): string {
    return this.authService.getHello();
  }
}
