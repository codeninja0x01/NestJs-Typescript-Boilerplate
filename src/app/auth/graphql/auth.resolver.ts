import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from '../auth.service';
import { AuthUserDto } from '../dto/auth-user.dto';
import { SigninDto } from '../dto/signin-auth.dto';
import { SignupDto } from '../dto/signup-auth.dto';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Mutation()
    public signin(@Args('signinInput') signinInput: SigninDto): Promise<AuthUserDto> {
        return this.authService.signIn(signinInput);
    }

    @Mutation()
    public signup(@Args('signupInput') signupInput: SignupDto): Promise<AuthUserDto> {
        return this.authService.signUp(signupInput);
    }

}
