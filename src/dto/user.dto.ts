import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsPhoneNumber,
} from 'class-validator';
import IUser from '../interface/user.interface';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  BanInputType,
  BanObjectType,
  ContractInputType,
  ContractObjectType,
  DobInputType,
  DobObjectType,
  LoginInputType,
  LoginObjectType,
  NameInputType,
  NameObjectType,
  TokensInputType,
  TokensObjectType,
  WorkInputType,
  WorkObjectType,
} from '../interface/user.graphql.types';

export class UserDto implements IUser {
  @IsNotEmptyObject()
  name: NameObjectType;

  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  isOnline: boolean;

  @IsNotEmpty()
  uuid: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  picture: string;

  @IsNotEmpty()
  login: LoginObjectType;

  @IsNotEmpty()
  dob: DobObjectType;

  @IsNotEmpty()
  @Field()
  registered_date: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  job: string;

  contract?: ContractObjectType;

  payment?: number;

  work?: WorkObjectType;

  ban?: BanObjectType;

  token?: TokensObjectType;
}

@InputType()
export class UserInputDto implements IUser {
  @IsNotEmptyObject()
  @Field()
  name: NameInputType;

  @Field()
  @IsNotEmpty()
  uuid: string;

  @Field()
  @IsNotEmpty()
  isOnline: boolean;

  @Field()
  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  @Field()
  gender: string;

  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @Field()
  picture: string;

  @IsNotEmpty()
  @Field()
  login: LoginInputType;

  @IsNotEmpty()
  @Field()
  dob: DobInputType;

  @IsNotEmpty()
  @Field()
  registered_date: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @Field()
  phone: string;

  @IsNotEmpty()
  @Field()
  job: string;

  @Field({ nullable: true })
  contract?: ContractInputType;

  @Field(() => Int, { nullable: true })
  payment?: number;

  @Field({ nullable: true })
  work?: WorkInputType;

  @Field({ nullable: true })
  ban?: BanInputType;

  @Field({ nullable: true })
  token?: TokensInputType;
}

@ObjectType()
export class UserOutputDto implements IUser {
  @IsNotEmptyObject()
  @Field()
  name: NameObjectType;

  @Field()
  @IsNotEmpty()
  role: string;

  @Field()
  @IsNotEmpty()
  isOnline: boolean;

  @Field()
  @IsNotEmpty()
  uuid: string;

  @IsNotEmpty()
  @Field()
  gender: string;

  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @Field()
  picture: string;

  @IsNotEmpty()
  @Field()
  login: LoginObjectType;

  @IsNotEmpty()
  @Field()
  dob: DobObjectType;

  @IsNotEmpty()
  @Field()
  registered_date: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @Field()
  phone: string;

  @IsNotEmpty()
  @Field()
  job: string;

  @Field({ nullable: true })
  contract?: ContractObjectType;

  @Field(() => Int, { nullable: true })
  payment?: number;

  @Field({ nullable: true })
  work?: WorkObjectType;

  @Field({ nullable: true })
  ban?: BanObjectType;

  @Field({ nullable: true })
  token?: TokensObjectType;
}
