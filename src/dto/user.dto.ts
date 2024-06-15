import { IsEmail, IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import IUser from '../interface/user.interface';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  BanInputType,
  BanObjectType,
  LoginInputType,
  LoginObjectType,
  NameInputType,
  NameObjectType,
  TokensInputType,
  TokensObjectType,
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
  job: string;

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
  job: string;

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
  login: LoginObjectType;

  @IsNotEmpty()
  @Field()
  job: string;

  @Field({ nullable: true })
  ban?: BanObjectType;

  @Field({ nullable: true })
  token?: TokensObjectType;
}
