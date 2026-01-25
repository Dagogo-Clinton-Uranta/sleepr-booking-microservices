//we are creating a decorator by ourselves here wow !

import {createParamDecorator, ExecutionContext} from "@nestjs/common"
import { UserDocument } from "./users/models/user.schema"


const getCurrentUserByContext = (context:ExecutionContext): UserDocument => {
 return context.switchToHttp().getRequest().user

 //i understand that we are trying to sget the UserDocument RETURNEED from @useGuards(localAuthGuard), 
 //but why are we switching context to http ? what was the previous conteext then ?
}


export const CurrentUser = createParamDecorator(
    //we pass a whole function as argument  
    (_data:unknown,context:ExecutionContext)=> getCurrentUserByContext(context)
)