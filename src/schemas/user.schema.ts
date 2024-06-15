import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Field, ObjectType } from "@nestjs/graphql";
import IUser from "../interface/user.interface";
import {
  BanObjectType,
  LoginObjectType,
  NameObjectType,
} from "../interface/user.graphql.types";

export type UserDocument = UserModel & Document;

@ObjectType()
@Schema({ collection: "users", timestamps: true })
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
  @Prop({ required: true })
  job: string;

  @Field({ nullable: true })
  @Prop({ type: Object, required: false })
  ban?: BanObjectType;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
