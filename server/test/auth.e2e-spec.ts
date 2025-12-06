import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module.js';

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    const uniqueEmail = `test${Date.now()}@example.com`;
    const userData = {
        email: uniqueEmail,
        password: 'password123',
        name: 'Test User',
    };

    it('/auth/register (POST)', () => {
        return request(app.getHttpServer())
            .post('/auth/register')
            .send(userData)
            .expect(201)
            .then((response) => {
                expect(response.body).toHaveProperty('id');
                expect(response.body.email).toEqual(userData.email);
            });
    });

    it('/auth/login (POST)', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: userData.email,
                password: userData.password,
            })
            .expect(201)
            .then((response) => {
                expect(response.body).toHaveProperty('access_token');
            });
    });

    it('/auth/login (POST) - Fail with wrong password', () => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: userData.email,
                password: 'wrongpassword',
            })
            .expect(401);
    });
});
