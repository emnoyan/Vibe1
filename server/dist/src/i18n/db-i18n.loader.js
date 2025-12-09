"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DbI18nLoader_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbI18nLoader = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
let DbI18nLoader = DbI18nLoader_1 = class DbI18nLoader {
    prisma;
    logger = new common_1.Logger(DbI18nLoader_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async languages() {
        try {
            const result = await this.prisma.$queryRaw `SELECT DISTINCT "locale" FROM "Translation"`;
            const languages = result.map((r) => r.locale);
            this.logger.log(`Loaded languages from DB: ${JSON.stringify(languages)}`);
            return languages;
        }
        catch (error) {
            this.logger.error('Failed to load languages', error);
            return [];
        }
    }
    async load() {
        this.logger.log('Loading translations from database (via SQL)...');
        try {
            const translations = await this.prisma.$queryRaw `SELECT "key", "locale", "value" FROM "Translation"`;
            const i18nTranslations = {};
            for (const t of translations) {
                if (!i18nTranslations[t.locale]) {
                    i18nTranslations[t.locale] = {};
                }
                i18nTranslations[t.locale][t.key] = t.value;
            }
            return i18nTranslations;
        }
        catch (error) {
            this.logger.error('Failed to load translations', error);
            return {};
        }
    }
};
exports.DbI18nLoader = DbI18nLoader;
exports.DbI18nLoader = DbI18nLoader = DbI18nLoader_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], DbI18nLoader);
//# sourceMappingURL=db-i18n.loader.js.map