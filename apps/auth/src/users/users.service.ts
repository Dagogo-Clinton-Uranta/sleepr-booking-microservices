import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
 
    constructor(private readonly usersRepository:UsersRepository){
        
    }

    async create(createUserDto: CreateUserDto){
      await this.validateCreateUserDto(createUserDto)


     return this.usersRepository.create({
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password,10)
     });
    }

    private async validateCreateUserDto(createUserDto: CreateUserDto){
        try {
            await this.usersRepository.findOne({email: createUserDto.email});

        }
        catch(err){ 
            return //na wa o , we use this return here to continue on with the rest of the method...like, this is the positive blobk
        }

        throw new UnprocessableEntityException('Email already exists.')
    }


    async verifyUser(email:string,password:string){
        const user = await this.usersRepository.findOne({email})
        const passwordIsValid = await bcrypt.compare(password,user.password);

        if(!passwordIsValid){
            throw new UnauthorizedException('Credentials are not valid')
        }
    }


    async getUser(getUserDto:GetUserDto)  {

        //i was wondering why return type is not explicitly stated, but TypeScript does have a return type here — it’s just inferred, not explicitly written.
        //a lot of these repository methods, using mongoDB have types that typescript understand, so it is implied implicity..its  a style choice
        //in my case, it has infered to return  Promise<UserDocument> , by hovering over getUser, promise because of the asyn ofc
        //You should add explicit return types for public service methods

        //You should explicitly type the return when:

       //✔ You expose a public service method
       //✔ You want to enforce a contract
       //✔ You want to avoid any leaks
       //✔ You’re returning a transformed object


      return this.usersRepository.findOne(getUserDto)
    }





}

