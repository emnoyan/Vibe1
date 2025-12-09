"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_js_1 = require("./app.controller.js");
const app_service_js_1 = require("./app.service.js");
const users_module_js_1 = require("./users/users.module.js");
const prisma_module_js_1 = require("./prisma/prisma.module.js");
const auth_module_js_1 = require("./auth/auth.module.js");
const posts_module_js_1 = require("./posts/posts.module.js");
const categories_module_js_1 = require("./categories/categories.module.js");
const invoices_module_js_1 = require("./invoices/invoices.module.js");
const nestjs_i18n_1 = require("nestjs-i18n");
const db_i18n_loader_js_1 = require("./i18n/db-i18n.loader.js");
const test_i18n_controller_js_1 = require("./test-i18n.controller.js");
const i18n_controller_js_1 = require("./i18n/i18n.controller.js");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_js_1.PrismaModule,
            users_module_js_1.UsersModule,
            auth_module_js_1.AuthModule,
            posts_module_js_1.PostsModule,
            categories_module_js_1.CategoriesModule,
            invoices_module_js_1.InvoicesModule,
            nestjs_i18n_1.I18nModule.forRootAsync({
                useFactory: () => ({
                    fallbackLanguage: 'en',
                    loaderOptions: {},
                }),
                loader: db_i18n_loader_js_1.DbI18nLoader,
                resolvers: [
                    { use: nestjs_i18n_1.QueryResolver, options: ['lang'] },
                    nestjs_i18n_1.AcceptLanguageResolver,
                    new nestjs_i18n_1.HeaderResolver(['x-custom-lang']),
                ],
            }),
        ],
        controllers: [app_controller_js_1.AppController, test_i18n_controller_js_1.TestI18nController, i18n_controller_js_1.I18nController],
        providers: [app_service_js_1.AppService, db_i18n_loader_js_1.DbI18nLoader],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map