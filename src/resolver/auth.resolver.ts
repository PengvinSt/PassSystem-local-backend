import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from '../schemas/user.schema';
import { UserDto, UserInputDto, UserOutputDto } from '../dto/user.dto';
import { AuthService } from '../services/auth.service';
import {
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import IActionStatus from '../interface/action-status.interface';
import { LoginInputType } from '../interface/user.graphql.types';

@Resolver(() => UserModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Query(() => UserOutputDto)
  async login(
    @Args('LoginInputType') user: LoginInputType,
  ): Promise<UserOutputDto> {
    const result: IActionStatus & UserDto = await this.authService.login(user);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @UsePipes(new ValidationPipe())
  @Mutation(() => UserModel)
  async register(@Args('UserDto') user: UserInputDto): Promise<UserModel> {
    const result: IActionStatus & UserModel =
      await this.authService.register(user);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }
}
