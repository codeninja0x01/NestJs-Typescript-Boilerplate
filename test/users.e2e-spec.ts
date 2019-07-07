import * as request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from '../src/app/user/user.model';
import { UserModule } from '../src/app/user/user.module';

describe('Users', () => {
    let app: INestApplication;
    const userService = { getUser: () => [] };

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [UserModule],
        })
        .overrideProvider(getRepositoryToken(User))
        .useValue(userService)
        .compile();

        app = module.createNestApplication();
        await app.init();
    });

    it(`/GET user`, () => {
        return request(app.getHttpServer())
            .get('user')
            .expect(200)
            .expect({
                data: userService.getUser(),
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
