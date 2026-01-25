import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UsersService } from "../users/users.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy,'local'){

 constructor(private readonly usersService:UsersService){
   super({usernameField: 'email'})
   //the super is passing in options to the PassportStrategy class
   //option being usernameField
 }

 async validate(email: string, password: string ){ //this method needs to be implememnted for PassportStratergy extends to work
    //validate is even an empty method, we define how to validate using the userService
  try{
    return this.usersService.verifyUser(email,password)
  }
  catch(err){
    //we wrapped in a try catch block so that if the userService.validateUser throws an error, we can  re-throw it , and hence track where it's coming from
    throw new UnauthorizedException(err)
  }
 }



}