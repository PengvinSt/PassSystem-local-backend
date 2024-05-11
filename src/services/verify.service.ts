import { Model } from 'mongoose';
import { UserDocument, UserModel } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import IActionStatus from '../interface/action-status.interface';

@Injectable()
export class VerifyService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  public async verify(body: {
    uuid: string;
    token: string;
  }): Promise<IActionStatus> {
    const candidate = await this.userModel.findOne({ uuid: body.uuid }).exec();
    if (!candidate)
      throw new HttpException(`User is not exist!`, HttpStatus.BAD_REQUEST);
    if (candidate.ban !== undefined && candidate.ban.isBaned === true) {
      throw new HttpException('User is banned!', HttpStatus.FORBIDDEN);
    }
    const verified = true;
    if (verified) {
      console.log('Gates open!!');
      return { message: 'User verified', success: true };
    }

    return { message: 'User not verified/ try again later', success: false };
  }

  public async userOnline(body: {
    uuid: string;
    isVerified: boolean;
  }): Promise<IActionStatus> {
    const candidate = await this.userModel.findOne({ uuid: body.uuid }).exec();
    if (!candidate)
      throw new HttpException(`User is not exist!`, HttpStatus.BAD_REQUEST);

    if (candidate.ban !== undefined && candidate.ban.isBaned === true) {
      throw new HttpException('User is banned!', HttpStatus.FORBIDDEN);
    }

    const newUser: UserModel = {
      ...candidate,
      isOnline: true,
    };

    await this.userModel
      .findOneAndUpdate({ uuid: body.uuid }, newUser, { new: true })
      .exec();

    return { message: 'User set to online', success: true };
  }

  public async userOffline(body: {
    uuid: string;
    isVerified: boolean;
  }): Promise<IActionStatus> {
    const candidate = await this.userModel.findOne({ uuid: body.uuid }).exec();
    if (!candidate)
      throw new HttpException(`User is not exist!`, HttpStatus.BAD_REQUEST);

    if (candidate.ban !== undefined && candidate.ban.isBaned === true) {
      throw new HttpException('User is banned!', HttpStatus.FORBIDDEN);
    }

    const newUser: UserModel = {
      ...candidate,
      isOnline: false,
    };

    await this.userModel
      .findOneAndUpdate({ uuid: body.uuid }, newUser, { new: true })
      .exec();
    return { message: 'User set to offline', success: true };
  }
}
