import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { SigninDto } from './dto/signin-auth.dto';
import { SignupDto } from './dto/signup-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signin')
  public signin(@Body() userDto: SigninDto): Promise<AuthUserDto> {
    return this.authService.signIn(userDto);
  }

  @Post('signup')
  public signup(@Body() userDto: SignupDto): Promise<AuthUserDto> {
    return this.authService.signUp(userDto);
  }
}
