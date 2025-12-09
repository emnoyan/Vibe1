import { Controller, Get } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('test-i18n')
export class TestI18nController {
    @Get()
    async getHello(@I18n() i18n: I18nContext) {
        return {
            message: await i18n.t('hello'),
            welcome: await i18n.t('welcome'),
        };
    }
}
