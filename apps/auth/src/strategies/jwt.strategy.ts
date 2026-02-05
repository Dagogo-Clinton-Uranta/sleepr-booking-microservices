import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";
import { Request } from "express";
import { TokenPayload } from "../interfaces/token-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {


    constructor(configService: ConfigService,private readonly usersService: UsersService ){
     
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([   //this specifies where on the request object that the kwt lives, we passs it into passport strategy
          (request: any) => {
            console.log(request);

           return  request?.cookies?.Authentication || request?.Authentication
           
        }
        ]),
        secretOrKey:configService.get("JWT_SECRET"),
        })


       
    }


   // WE ARE USING THE USER ID HERE BECAUSE AFTER THE JWT IS DECODED ABOVE, THE TOKEN PAYLOAD USED WHEN CREATING THE TOKEN IS GONNA BE SUPPLIED TO THE VALIDATE PAYLOAD
   


    async validate({userId}: TokenPayload){

     return this.usersService.getUser({_id:userId})

    }

}