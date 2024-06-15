import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import IActionStatus from '../interface/action-status.interface';
import { LoginInputType } from '../interface/user.graphql.types';
import ITokens from '../interface/token.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: UserDto): Promise<IActionStatus & UserDto> {
    let status: IActionStatus = {
      success: true,
      message: 'user registered',
    };
    let user: UserDto;
    try {
      user = await this.userService.createUser(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }

    return { ...status, ...user };
  }

  async login(loginUserDto: LoginInputType): Promise<IActionStatus & UserDto> {
    let status: IActionStatus = {
      success: true,
      message: 'user registered',
    };
    let user: UserDto;
    try {
      console.log('YEEES');
      user = await this.userService.loginByLogin(loginUserDto);

      const token = this._createToken(user);
      user.token = {
        accessToken: token.accessToken,
        expiresIn: token.expiresIn,
      };
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
      console.log(err);
    }
    return { ...status, ...user };
  }

  async validateUser(payload: { uuid: string }): Promise<UserDto> {
    const options = { uuid: payload.uuid };
    const user = await this.userService.findOne(options);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken(userDto: UserDto): ITokens {
    const expiresIn = process.env.EXPIRESIN + '';
    const user = { uuid: userDto.uuid };
    const accessToken = this.jwtService.sign(user);

    return {
      expiresIn,
      accessToken,
    };
  }
}
