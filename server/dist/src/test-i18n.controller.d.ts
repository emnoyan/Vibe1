import { I18nContext } from 'nestjs-i18n';
export declare class TestI18nController {
    getHello(i18n: I18nContext): Promise<{
        message: unknown;
        welcome: unknown;
    }>;
}
