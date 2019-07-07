import * as bcrypt from 'bcrypt';

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { SigninDto } from './dto/signin-auth.dto';
import { SignupDto } from './dto/signup-auth.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  public async signIn(userDto: SigninDto): Promise<AuthUserDto> {
    const user = await this.userService.findByEmail(userDto.email);
    if (!user) { throw new BadRequestException({ error: 'Email or password is invalid' }); }

    const compare = await this.comparePassword(user, userDto.password);

    if (!compare) { throw new BadRequestException({ error: 'Email or password is invalid' }); }

    const userPayload: JwtPayload = { name: user.name, email: user.email };
    const token = this.jwtService.sign(userPayload);
    const res: AuthUserDto = {
      token,
      user: { email: userDto.email, name: user.name } as any,
    };
    return res;
  }

  public async signUp(userDto: SignupDto): Promise<AuthUserDto> {
    const newUser = new User();
    newUser.email = userDto.email;
    newUser.name = userDto.name;
    newUser.password = userDto.password;
    const user = await this.userService.save(newUser);
    if (!user) { throw new NotFoundException('User not exist'); }

    const userPayload: JwtPayload = { name: user.name, email: user.email };
    const token = await this.jwtService.sign(userPayload);

    const res: AuthUserDto = {
      user: { email: user.email, name: user.name } as any,
      token,
    };
    return res;
  }

  public async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findByEmail(payload.email);
  }

  public async comparePassword(user: User, pwd: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(pwd, user.password, (err, res) => {
        resolve(res === true);
      });
    });
  }
}
