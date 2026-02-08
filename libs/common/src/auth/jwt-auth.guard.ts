import {CanActivate, ExecutionContext, Inject, Injectable} from "@nestjs/common"
import { Observable, catchError, map, of, tap } from "rxjs"
import { AUTH_SERVICE } from "../constants/services"
import { UserDto } from "../dto"

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy){
        //client proxy is how we talk to other microservices in nest js architecture

    }

canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication //o give us the current inflight object for this route, and we'll look for the cookies
    //cookie parser helps us look through the cookies (cookie parser was wrapped around our whole application)

if(!jwt){
    return false
}

  return this.authClient.send<UserDto>('authenticate',{
    Authentication: jwt,

  }).pipe( 
    tap((res)=>{
    context.switchToHttp().getRequest().user = res;
    }),
    map(()=>true), //this map is just an observable way of returning true
    catchError(()=>of(false))
  )


}


}