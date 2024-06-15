import { Types } from 'mongoose';
import { UserDto } from '../dto/user.dto';
import { UserDocument } from '../schemas/user.schema';

export class PrettyDto {
  static prettyUserDto = (data: UserDocument): UserDto => {
    const {
      _id,
      uuid,
      role,
      name,
      gender,
      email,
      picture,
      login,
      job,
      ban,
      isOnline,
    } = data;

    const userDto: UserDto & { _id: Types.ObjectId } = {
      _id,
      role,
      name,
      gender,
      email,
      picture,
      login,
      job,
      ban: ban !== undefined ? ban : { isBaned: false, banDate: 'Not banned' },
      uuid,
      isOnline,
      token: { accessToken: '', expiresIn: '' },
    };

    return userDto;
  };
  static prettyAllUsersDto = (data: UserDocument[]): UserDto[] => {
    const allUsersDto = [];

    data.forEach((userDto) => {
      const prettyUser = this.prettyUserDto(userDto);
      allUsersDto.push(prettyUser);
    });

    return allUsersDto;
  };
}
