import { AuthService } from './auth.service.js';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private authService;
    private jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    login(signInDto: Record<string, any>): Promise<{
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
    logout(req: any): Promise<{
        id: number;
        email: string;
        password: string;
        name: string | null;
        role: import("../../generated/prisma/enums.js").Role;
        status: import("../../generated/prisma/enums.js").UserStatus;
        searchText: string;
        hashedRefreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    refresh(body: {
        refresh_token: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
