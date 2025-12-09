import { I18nService } from 'nestjs-i18n';
export declare class I18nController {
    private readonly i18n;
    constructor(i18n: I18nService);
    refresh(): Promise<{
        message: string;
    }>;
}
