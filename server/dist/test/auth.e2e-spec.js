"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const supertest_1 = __importDefault(require("supertest"));
const app_module_1 = require("./../src/app.module");
describe('AuthController (e2e)', () => {
    let app;
    beforeEach(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
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
        return (0, supertest_1.default)(app.getHttpServer())
            .post('/auth/register')
            .send(userData)
            .expect(201)
            .then((response) => {
            expect(response.body.user).toHaveProperty('id');
            expect(response.body.user.email).toEqual(userData.email);
        });
    });
    it('/auth/login (POST)', () => {
        return (0, supertest_1.default)(app.getHttpServer())
            .post('/auth/login')
            .send({
            email: userData.email,
            password: userData.password,
        })
            .expect(200)
            .then((response) => {
            expect(response.body).toHaveProperty('access_token');
        });
    });
    it('/auth/login (POST) - Fail with wrong password', () => {
        return (0, supertest_1.default)(app.getHttpServer())
            .post('/auth/login')
            .send({
            email: userData.email,
            password: 'wrongpassword',
        })
            .expect(401);
    });
});
//# sourceMappingURL=auth.e2e-spec.js.map