import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService
    ) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() signInDto: Record<string, any>) {
        const user = await this.authService.validateUser(signInDto.email, signInDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Req() req: any) {
        return this.authService.logout(req.user.userId || req.user.id || req.user.sub);
    }

    @Post('refresh')
    async refresh(@Body() body: { refresh_token: string }) {
        try {
            const payload = await this.jwtService.verifyAsync(body.refresh_token);
            return this.authService.refreshTokens(payload.sub, body.refresh_token);
        } catch (e) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}
