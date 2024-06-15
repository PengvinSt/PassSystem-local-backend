import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { UserDto } from "../dto/user.dto";
import { AuthService } from "../services/auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secretKey",
    });
  }

  async validate(payload: { uuid: string }): Promise<UserDto> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
