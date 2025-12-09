import { I18nLoader, I18nTranslation } from 'nestjs-i18n';
import { PrismaService } from '../prisma/prisma.service.js';
export declare class DbI18nLoader implements I18nLoader {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    languages(): Promise<string[]>;
    load(): Promise<I18nTranslation>;
}
