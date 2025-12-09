import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { I18nService } from 'nestjs-i18n';
export declare class AuthService {
    private usersService;
    private jwtService;
    private readonly i18n;
    private readonly logger;
    constructor(usersService: UsersService, jwtService: JwtService, i18n: I18nService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
            status: any;
            managedCategories: any;
        };
        access_token: string;
        refresh_token: string;
    }>;
    register(createUserDto: CreateUserDto): Promise<{
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
            status: any;
            managedCategories: any;
        };
        access_token: string;
        refresh_token: string;
    }>;
    logout(userId: number): Promise<{
        id: number;
        email: string;
        password: string;
        name: string | null;
        role: import("../../generated/prisma/enums.js").Role;
        status: import("../../generated/prisma/enums.js").UserStatus;
        language: string;
        searchText: string;
        hashedRefreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    refreshTokens(userId: number, rt: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    updateRefreshToken(userId: number, refreshToken: string): Promise<void>;
    getTokens(userId: number, email: string, role: string, managedCategories?: any[]): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
