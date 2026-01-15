import { Logger, NotFoundException } from "@nestjs/common"
import { AbstractDocument } from "./abstract.schema"
import { Model, Types, UpdateQuery,FilterQuery } from "mongoose"

//this is going to be the common repository that all other repos in our microservices will extend from
//it makes sure that we dont have to duplicate this code in all our microservices -DRY

//the generic type  TDocument is the type for the document that this repo is associated with i.e we made abstract document a type


export abstract class AbstractRepository<TDocument extends AbstractDocument>{
 
 constructor(protected readonly model: Model<TDocument>){ }

 protected abstract readonly logger: Logger;

 async create(document: Omit<TDocument,'_id'>):Promise<TDocument>{
  const createdDocument = new this.model({
    ...document,
    _id:new Types.ObjectId()

  });

  return (await createdDocument.save()).toJSON() as unknown as TDocument //you can double typecast ??

 }
 

 async findOne(filterQuery: FilterQuery <TDocument>):Promise<TDocument>{ //note where to place the semi colon for the return type, it is b4 anything else

   const document =  await this.model.findOne(filterQuery).lean<TDocument>(true) //when we slap this generic <TDocument> we are checking if the type is of TDocument when returned


if(!document){
    this.logger.warn("The document was not found with filterQuery==>",filterQuery)
    throw new NotFoundException("Document was not found!")
}

return document

 }

 async findOneAndUpdate(filterQuery: FilterQuery<TDocument> , update:UpdateQuery<TDocument>) {
  const document = this.model.findOneAndUpdate(filterQuery,update,{new:true}).lean<TDocument>(true) //the document curly braces is the options object, which is usually the third argument

  if(!document){

      this.logger.warn("The document to update was not found with filterQuery ===>", filterQuery)

    throw new NotFoundException("Document to update was not found")
  }


  return document

 }


 async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {

   return this.model.find(filterQuery).lean<TDocument[]>(true)


 }


 async findOneAndDelete(filterQuery: FilterQuery<TDocument>): Promise<TDocument>{
  //the generic in the promise affected the return of this function as it was typed wrong
    return this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
 }




}