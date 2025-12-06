import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Role, UserStatus } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsEnum(Role)
    role?: Role;

    @IsOptional()
    @IsEnum(UserStatus)
    status?: UserStatus;
}
