import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ConfigService } from '../config/config.service';
import { User } from '../user/user.model';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService, config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('user-key'),
      secretOrKey: config.get('JWT_SECRET_KEY'),
    });
  }

  public async validate(payload: JwtPayload): Promise<User> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
