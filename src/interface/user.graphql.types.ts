import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

// ------- NameType -------------
@ObjectType()
export class NameObjectType {
  @Field()
  first: string;

  @Field()
  last: string;
}

@InputType()
export class NameInputType {
  @Field()
  first: string;

  @Field()
  last: string;
}

// ------- LoginType -------------

@ObjectType()
export class LoginObjectType {
  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
export class LoginInputType {
  @Field()
  username: string;

  @Field()
  password: string;
}

// ------- DobType -------------
@ObjectType()
export class DobObjectType {
  @Field()
  date: string;
  @Field(() => Int)
  age: number;
}

@InputType()
export class DobInputType {
  @Field()
  date: string;
  @Field(() => Int)
  age: number;
}

// ------- Contract Type -------------
@ObjectType()
export class ContractObjectType {
  @Field()
  document: string;

  @Field()
  startDate: string;
}

@InputType()
export class ContractInputType {
  @Field()
  document: string;

  @Field()
  startDate: string;
}

// ------- SheduelHoursType -------------
@ObjectType()
export class SheduelHoursObjectType {
  @Field()
  startHour: string;

  @Field()
  endHour: string;

  @Field(() => Int)
  full: number;
}

@InputType()
export class SheduelHoursInputType {
  @Field()
  startHour: string;

  @Field()
  endHour: string;

  @Field(() => Int)
  full: number;
}

// ------- SheduelType -------------
@ObjectType()
export class SheduelObjectType {
  @Field()
  date: string;

  @Field()
  hours: SheduelHoursObjectType;

  @Field(() => String)
  task: string;
}

@InputType()
export class SheduelInputType {
  @Field()
  date: string;

  @Field()
  hours: SheduelHoursInputType;

  @Field(() => String)
  task: string;
}

// ------- WorkType -------------
@ObjectType()
export class WorkObjectType {
  @Field(() => Int)
  hours: number;

  @Field(() => [SheduelObjectType])
  sheduel: SheduelObjectType[];
}

@InputType()
export class WorkInputType {
  @Field(() => Int)
  hours: number;

  @Field(() => [SheduelInputType])
  sheduel: SheduelInputType[];
}

// ------- BanType -------------
@ObjectType()
export class BanObjectType {
  @Field()
  isBaned: boolean;

  @Field()
  banDate?: string;
}

@InputType()
export class BanInputType {
  @Field()
  isBaned: boolean;

  @Field()
  banDate?: string;
}

// ------- TokenType -------------
@ObjectType()
export class TokensObjectType {
  @Field()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  accessToken: string;

  @Field()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expiresIn: string;
}

@InputType()
export class TokensInputType {
  @Field()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  accessToken: string;

  @Field()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expiresIn: string;
}
