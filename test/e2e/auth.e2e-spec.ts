import * as request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AuthModule } from '../../src/app/auth/auth.module';
import { AuthService } from '../../src/app/auth/auth.service';
import { SigninDto } from '../../src/app/auth/dto/signin-auth.dto';
import { SignupDto } from '../../src/app/auth/dto/signup-auth.dto';
import { JwtStrategy } from '../../src/app/auth/jwt.strategy';
import { ConfigModule } from '../../src/app/config/config.module';
import { User } from '../../src/app/user/user.model';
import { UserModule } from '../../src/app/user/user.module';

describe('Auth Controller (e2e)', () => {
    let app: INestApplication;

    const user = {
        email: 'codeninja0x01@gmail.com',
        name: 'codeninja',
        password: '123456789',
     };

    const authService = {
        signIn: () => {
            return {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cJ9.eyJuYW1lIjoiSm9lIERvZSIsImVtYWlsIjoiY29kZW5pbmphc0BnbWFpbC',
                user,
            };
        },
        signUp: () => {
            return {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cJ9.eyJuYW1lIjoiSm9lIERvZSIsImVtYWlsIjoiY29kZW5pbmphc0BnbWFpbC',
                user,
            };
        },
    };

    const signin: SigninDto = {
        email: user.email,
        password: user.password,
    };

    const signup: SignupDto = {
        email: user.email,
        password: user.password,
        name: user.name,
    };

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                ConfigModule,
                AuthModule,
                UserModule,
            ],
            providers: [JwtStrategy],
        })
            .overrideProvider(getRepositoryToken(User))
            .useValue({})
            .overrideProvider(AuthService)
            .useValue(authService)
            .compile();

        app = module.createNestApplication();
        await app.init();
    });

    it(`/GET signin`, () => {
        return request(app.getHttpServer())
            .post('/auth/signin')
            .send(signin)
            .expect(201)
            .expect(authService.signIn());
    });

    it(`/GET signup`, () => {
        return request(app.getHttpServer())
            .post('/auth/signup')
            .send(signup)
            .expect(201)
            .expect(authService.signIn());
    });

    afterAll(async () => {
        await app.close();
    });
});
