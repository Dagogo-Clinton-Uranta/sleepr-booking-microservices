import { Injectable} from '@nestjs/common';
import { Response } from 'express';
import { UserDocument } from './users/models/user.schema';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  getHello(): string {
    return 'Hello World!';
  }

  constructor(private readonly configService: ConfigService,
    private readonly jwtService: JwtService){

  }

  async login(user: UserDocument, response: Response){

 const tokenPayload = {
 userId: user._id.toHexString()
 }


   
  }




}
