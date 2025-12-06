var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity.js';
import { Prisma } from '@prisma/client';
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        try {
            return await this.prisma.user.create({
                data: {
                    ...createUserDto,
                    password: hashedPassword,
                },
            });
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ConflictException('Email already exists');
            }
            throw error;
        }
    }
    async findAll() {
        const users = await this.prisma.user.findMany();
        return users.map((user) => new UserEntity(user));
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (user) {
            return new UserEntity(user);
        }
        return null;
    }
    async findOneByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    async update(id, updateUserDto) {
        if (updateUserDto.password === '' || updateUserDto.password === undefined || updateUserDto.password === null) {
            delete updateUserDto.password;
        }
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        try {
            return await this.prisma.user.update({
                where: { id },
                data: updateUserDto,
            });
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ConflictException('Email already exists');
            }
            throw error;
        }
    }
    remove(id) {
        return this.prisma.user.delete({ where: { id } });
    }
};
UsersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map