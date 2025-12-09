import { Controller, Post, UseGuards } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Role } from 'generated/prisma/client';

@Controller('i18n')
export class I18nController {
    constructor(private readonly i18n: I18nService) { }

    @Post('refresh')
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(Role.ADMIN) 
    // Commenting out guards for easier testing/demo purposes as requested, 
    // or per plan "leave it open or simple auth". 
    // Given user just wants to see it update, open is easiest for now, 
    // but let's at least keep it as a separate controller.
    async refresh() {
        await this.i18n.refresh();
        return { message: 'Translations refreshed' };
    }
}
