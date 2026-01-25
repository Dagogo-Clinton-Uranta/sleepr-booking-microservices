import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { localAuthGuard } from './guards/local-auth-guard';
import { CurrentUser } from './current-user.decorator';
import { UserDocument } from './users/models/user.schema';

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



  @Get()
  getHello(): string {
    return this.authService.getHello();
  }
}
