import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import IUser from '../interface/user.interface';
import {
  BanObjectType,
  ContractObjectType,
  DobObjectType,
  LoginObjectType,
  NameObjectType,
  WorkObjectType,
} from '../interface/user.graphql.types';

export type UserDocument = UserModel & Document;

@ObjectType()
@Schema({ collection: 'users', timestamps: true })
export class UserModel implements IUser {
  @Field()
  @Prop({ type: Object, required: true })
  name: NameObjectType;

  @Field()
  @Prop({ required: true })
  role: string;

  @Field()
  @Prop({ required: true })
  isOnline: boolean;

  @Field()
  @Prop({ unique: true, required: true })
  uuid: string;
  @Field()
  @Prop({ required: true })
  gender: string;

  @Field()
  @Prop({ required: true })
  email: string;

  @Field()
  @Prop({ required: true })
  picture: string;

  @Field()
  @Prop({ type: Object, required: true })
  login: LoginObjectType;

  @Field()
  @Prop({ type: Object, required: true })
  dob: DobObjectType;

  @Field()
  @Prop({ required: true })
  registered_date: string;

  @Field()
  @Prop({ required: true })
  phone: string;

  @Field()
  @Prop({ required: true })
  job: string;

  @Field({ nullable: true })
  @Prop({ type: Object, required: false })
  contract?: ContractObjectType;

  @Field(() => Int, { nullable: true })
  @Prop({ type: Number, required: false })
  payment?: number;

  @Field({ nullable: true })
  @Prop({ type: Object, required: false })
  work?: WorkObjectType;

  @Field({ nullable: true })
  @Prop({ type: Object, required: false })
  ban?: BanObjectType;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
