"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const supertest_1 = __importDefault(require("supertest"));
const app_module_1 = require("./../src/app.module");
describe('UsersController (e2e)', () => {
    let app;
    let adminToken;
    let userToken;
    let userToDeleteId;
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
    const adminEmail = `admin${Date.now()}@example.com`;
    const userEmail = `user${Date.now()}@example.com`;
    it('Setup: Register Admin and User', async () => {
        await (0, supertest_1.default)(app.getHttpServer())
            .post('/auth/register')
            .send({
            email: adminEmail,
            password: 'password123',
            name: 'Admin User',
        })
            .expect(201);
    });
    it('Flow: User Permissions', async () => {
        const email = `testuser${Date.now()}@test.com`;
        await (0, supertest_1.default)(app.getHttpServer())
            .post('/auth/register')
            .send({ email, password: 'password', name: 'Test' })
            .expect(201);
        const loginRes = await (0, supertest_1.default)(app.getHttpServer())
            .post('/auth/login')
            .send({ email, password: 'password' })
            .expect(200);
        userToken = loginRes.body.access_token;
        await (0, supertest_1.default)(app.getHttpServer())
            .get('/users')
            .set('Authorization', `Bearer ${userToken}`)
            .expect(403);
        await (0, supertest_1.default)(app.getHttpServer())
            .post('/users')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ email: `new${Date.now()}@test.com`, password: 'password', name: 'New' })
            .expect(403);
        const randomId = 99999;
        await (0, supertest_1.default)(app.getHttpServer())
            .delete(`/users/${randomId}`)
            .set('Authorization', `Bearer ${userToken}`)
            .expect(403);
        await (0, supertest_1.default)(app.getHttpServer())
            .post('/users/bulk-delete')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ ids: [1, 2, 3] })
            .expect(403);
    });
});
//# sourceMappingURL=users.e2e-spec.js.map