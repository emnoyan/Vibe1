import { I18nLoader, I18nTranslation } from 'nestjs-i18n';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class DbI18nLoader implements I18nLoader {
    private readonly logger = new Logger(DbI18nLoader.name);

    constructor(private readonly prisma: PrismaService) { }

    async languages(): Promise<string[]> {
        try {
            const result = await this.prisma.$queryRaw<{ locale: string }[]>`SELECT DISTINCT "locale" FROM "Translation"`;
            const languages = result.map((r) => r.locale);
            this.logger.log(`Loaded languages from DB: ${JSON.stringify(languages)}`);
            return languages;
        } catch (error) {
            this.logger.error('Failed to load languages', error);
            return [];
        }
    }

    async load(): Promise<I18nTranslation> {
        this.logger.log('Loading translations from database (via SQL)...');
        try {
            const translations = await this.prisma.$queryRaw<{ key: string, locale: string, value: string }[]>`SELECT "key", "locale", "value" FROM "Translation"`;

            const i18nTranslations: I18nTranslation = {};

            for (const t of translations) {
                if (!i18nTranslations[t.locale]) {
                    i18nTranslations[t.locale] = {};
                }

                // Handle nesting: "auth.login" -> { auth: { login: "..." } }
                const keys = t.key.split('.');
                let current = i18nTranslations[t.locale];

                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    if (i === keys.length - 1) {
                        current[key] = t.value;
                    } else {
                        if (!current[key]) {
                            current[key] = {};
                        }
                        current = current[key] as any;
                    }
                }
            }

            return i18nTranslations;
        } catch (error) {
            this.logger.error('Failed to load translations', error);
            return {};
        }
    }
}
