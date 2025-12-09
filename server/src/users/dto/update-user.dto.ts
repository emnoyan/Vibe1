import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';
import { IsEnum, IsOptional, IsString, IsArray, IsNumber } from 'class-validator';
import { Role, UserStatus } from '../../../generated/prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsEnum(Role)
    role?: Role;

    @IsOptional()
    @IsEnum(UserStatus)
    status?: UserStatus;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    managedCategoryIds?: number[];

    @IsOptional()
    @IsString()
    language?: string;
}
