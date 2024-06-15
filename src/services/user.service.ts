import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { UserDto } from '../dto/user.dto';
import { PrettyDto } from '../utilities/prettier.dto';
import { LoginInputType } from '../interface/user.graphql.types';
import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findMany(): Promise<UserDto[]> {
    const user = await this.userModel.find();
    console.log(user);
    return PrettyDto.prettyAllUsersDto(user);
  }

  async findOne(options?: object): Promise<UserDto> {
    const user = await this.userModel.findOne(options).exec();
    if (!user)
      throw new HttpException(`User is not exist!`, HttpStatus.BAD_REQUEST);
    return PrettyDto.prettyUserDto(user);
  }

  async modifyOneUser(user: UserModel): Promise<UserDto> {
    const candidate = await this.userModel.findOne({ uuid: user.uuid }).exec();
    if (!candidate)
      throw new HttpException(`User is not exist!`, HttpStatus.BAD_REQUEST);

    const OldLogin = {
      username: candidate.login.username,
      password: candidate.login.password,
    };

    const newUser: UserModel = {
      ...user,
      login: OldLogin,
    };
    const savedUser = await this.userModel
      .findOneAndUpdate({ uuid: user.uuid }, newUser, { new: true })
      .exec();
    return PrettyDto.prettyUserDto(savedUser);
  }

  async createUser(user: UserDto): Promise<UserDto> {
    const candidate = await this.userModel.findOne({ email: user.email });

    if (candidate) {
      throw new HttpException(
        'User already exists(Email error)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const salt = await genSalt(10);

    const hashPassword = await hash(user.login.password, salt);

    const newLogin = {
      username: user.login.username,
      password: hashPassword,
    };

    const newUser: UserModel = {
      ...user,
      login: newLogin,
    };
    const createdUser = await this.userModel.create(newUser);

    return PrettyDto.prettyUserDto(createdUser);
  }

  async loginByLogin({ username, password }: LoginInputType): Promise<UserDto> {
    const candidate = await this.userModel
      .findOne({ 'login.username': username })
      .exec();
    if (!candidate) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (candidate.ban !== undefined && candidate.ban.isBaned === true) {
      throw new HttpException('User is banned!', HttpStatus.FORBIDDEN);
    }
    const areEqual = await compare(password, candidate.login.password);
    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return PrettyDto.prettyUserDto(candidate);
  }

  async banUser(uuid: string): Promise<boolean> {
    const candidate = await this.userModel.findOne({ uuid: uuid }).exec();
    if (!candidate)
      throw new HttpException(`User is not exist!`, HttpStatus.BAD_REQUEST);
    if (candidate.ban.isBaned) {
      const newBan = {
        isBaned: false,
        banDate: null,
      };
      await candidate.updateOne({ ban: newBan }).exec();
      return true;
    }
    const newBan = {
      isBaned: true,
      banDate: new Date().toISOString(),
    };
    await candidate.updateOne({ ban: newBan }).exec();
    return true;
  }
}
