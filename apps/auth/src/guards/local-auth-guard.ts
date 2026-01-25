import { AuthGuard } from "@nestjs/passport";



export class localAuthGuard extends AuthGuard('local') {
  //the string corresponds to the strategy name in local.strategy.ts file
 //the default is 'local' but u can change the string name by passing in a string as the second 
 //argument. In the local.strategy.ts file. I am just going to pass in 'local' as 2nd argument
 //just to support my point, even though default is already local

 

}