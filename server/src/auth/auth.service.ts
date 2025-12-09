import { Injectable, UnauthorizedException, ForbiddenException, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { I18nService, I18nContext } from 'nestjs-i18n';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private readonly i18n: I18nService
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        const i18nContext = I18nContext.current();
        this.logger.log(`Validating user. Current Language: ${i18nContext?.lang}`);

        if (user && user.status === 'INACTIVE') {
            const msg = i18nContext?.t('AUTH_ACCOUNT_INACTIVE');
            this.logger.log(`Inactive account message (${i18nContext?.lang}): ${msg}`);
            throw new UnauthorizedException(msg);
        }

        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const tokens = await this.getTokens(user.id, user.email, user.role, user.managedCategories);
        await this.updateRefreshToken(user.id, tokens.refresh_token);

        return {
            ...tokens,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                status: user.status,
                managedCategories: user.managedCategories
            }
        };
    }

    async register(createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        return this.login(user);
    }

    async logout(userId: number) {
        return this.usersService.updateRefreshToken(userId, null);
    }

    async refreshTokens(userId: number, rt: string) {
        const user = await this.usersService.findOne(userId);
        if (!user || !user.hashedRefreshToken) throw new ForbiddenException(I18nContext.current()?.t('AUTH_ACCESS_DENIED'));

        const rtMatches = await bcrypt.compare(rt, user.hashedRefreshToken);
        if (!rtMatches) throw new ForbiddenException(I18nContext.current()?.t('AUTH_ACCESS_DENIED'));

        const tokens = await this.getTokens(user.id, user.email, user.role, user.managedCategories);
        await this.updateRefreshToken(user.id, tokens.refresh_token);
        return tokens;
    }

    async updateRefreshToken(userId: number, refreshToken: string) {
        const hash = await bcrypt.hash(refreshToken, 10);
        await this.usersService.updateRefreshToken(userId, hash);
    }

    async getTokens(userId: number, email: string, role: string, managedCategories: any[] = []) {
        const managedCategoryIds = managedCategories ? managedCategories.map(c => c.id) : [];
        const payload = { sub: userId, email, role, managedCategoryIds };
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(payload, { expiresIn: '15m' }),
            this.jwtService.signAsync(payload, { expiresIn: '7d' }),
        ]);

        return {
            access_token: at,
            refresh_token: rt,
        };
    }
}
