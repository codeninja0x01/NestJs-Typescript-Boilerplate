import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { SigninDto } from './dto/signin-auth.dto';
import { SignupDto } from './dto/signup-auth.dto';

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: {},
                },
                {
                    provide: JwtService,
                    useValue: {},
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        authController = module.get<AuthController>(AuthController);
    });

    describe('signIn', () => {
        it('should return user and jwt token', async () => {

            const signIn: SigninDto = {
                email: 'test@gmail.com',
                password: 'test123',
            };

            const result: AuthUserDto = {
                token: '',
                user: new User(),
            };

            jest.spyOn(authService, 'signIn').mockImplementation(() => Promise.resolve(result));

            expect(await authController.signin(signIn)).toBe(result);
        });
    });

    describe('signUp', () => {
        it('should return a single tax', async () => {
            const signUp: SignupDto = {
                email: 'test@gmail.com',
                password: 'test123',
                name: 'test',
            };

            const result: AuthUserDto = {
                token: '',
                user: new User(),
            };
            jest.spyOn(authService, 'signUp').mockImplementation(() => Promise.resolve(result));

            expect(await authController.signup(signUp)).toBe(result);
        });
    });

});
