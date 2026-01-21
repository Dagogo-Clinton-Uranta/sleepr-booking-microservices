import { AbstractRepository } from "@app/common";
import { UserDocument } from "./models/user.schema";
import { Injectable } from "@nestjs/common";

@Injectable()

export class UsersRepository extends AbstractRepository<UserDocument> {

  protected readonly Logger = new this.Logger(UsersRepository.name)

  
}