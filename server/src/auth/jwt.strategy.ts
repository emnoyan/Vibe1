import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'secretKey',
        });
    }

    async validate(payload: any) {
        const user = await this.usersService.findOne(payload.sub);
        if (!user) {
            return null; // Or throw UnauthorizedException
        }

        // Return the full user object (or structured subset) 
        // including up-to-date managedCategories
        return {
            id: user.id,
            email: user.email,
            role: user.role,
            managedCategoryIds: user.managedCategories?.map(c => c.id) || [],
            // Include other fields if necessary for other guards
        };
    }
}
