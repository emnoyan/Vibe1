var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity.js';
import { Prisma } from '@prisma/client';
let UsersService = (() => {
    let _classDecorators = [Injectable()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var UsersService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            UsersService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        prisma;
        constructor(prisma) {
            this.prisma = prisma;
        }
        removeAccents(str) {
            return str
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd')
                .replace(/Đ/g, 'd')
                .toLowerCase();
        }
        async onModuleInit() {
            // Refresh searchText for all users to ensure new accent removal logic (e.g. Đ -> d) is applied
            const users = await this.prisma.user.findMany({
                select: { id: true, name: true, email: true, searchText: true },
            });
            for (const user of users) {
                const newSearchText = this.removeAccents((user.name || '') + ' ' + user.email);
                if (user.searchText !== newSearchText) {
                    await this.prisma.user.update({
                        where: { id: user.id },
                        data: { searchText: newSearchText },
                    });
                }
            }
        }
        async create(createUserDto) {
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
            const searchText = this.removeAccents((createUserDto.name || '') + ' ' + createUserDto.email);
            try {
                return await this.prisma.user.create({
                    data: {
                        ...createUserDto,
                        password: hashedPassword,
                        searchText,
                    },
                    include: {
                        managedCategories: true
                    }
                });
            }
            catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                    throw new ConflictException('Email already exists');
                }
                throw error;
            }
        }
        async findAll(params) {
            const { q, role, status, sortBy, sortOrder } = params || {};
            // Normalize query
            const normalizedQ = q ? this.removeAccents(q) : undefined;
            const where = {
                AND: [
                    normalizedQ ? {
                        searchText: { contains: normalizedQ, mode: 'insensitive' },
                    } : {},
                    role ? { role: role } : {},
                    status ? { status: status } : {},
                ],
            };
            const orderBy = sortBy ? {
                [sortBy]: sortOrder || 'asc',
            } : { id: 'asc' };
            const users = await this.prisma.user.findMany({
                where,
                orderBy,
                include: {
                    managedCategories: true,
                },
            });
            return users.map((user) => new UserEntity(user));
        }
        async findOne(id) {
            const user = await this.prisma.user.findUnique({
                where: { id },
                include: { managedCategories: true }
            });
            if (user) {
                return new UserEntity(user);
            }
            return null;
        }
        async findOneByEmail(email) {
            return this.prisma.user.findUnique({
                where: { email },
                include: { managedCategories: true }
            });
        }
        async update(id, updateUserDto) {
            // If password is provided but empty, remove it to prevent overwriting with empty string
            if (updateUserDto.password === '' || updateUserDto.password === undefined || updateUserDto.password === null) {
                delete updateUserDto.password;
            }
            // If password is provided and not empty, hash it
            if (updateUserDto.password) {
                updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
            }
            // Update searchText if name or email is changing, or both
            // However, updateDto is partial. We need current data to reconstruct full searchText IF we want to keep it sync.
            // Or we can just fetch current user first?
            // Optimization: If name or email is provided, fetch current, merge, update searchText.
            let searchText;
            if (updateUserDto.name !== undefined || updateUserDto.email !== undefined) {
                const currentUser = await this.prisma.user.findUnique({ where: { id } });
                if (currentUser) {
                    const newName = updateUserDto.name !== undefined ? updateUserDto.name : currentUser.name;
                    const newEmail = updateUserDto.email !== undefined ? updateUserDto.email : currentUser.email;
                    searchText = this.removeAccents((newName || '') + ' ' + newEmail);
                }
            }
            const { managedCategoryIds, ...userData } = updateUserDto;
            try {
                return await this.prisma.user.update({
                    where: { id },
                    data: {
                        ...userData,
                        ...(searchText ? { searchText } : {}),
                        ...(managedCategoryIds ? {
                            managedCategories: {
                                set: managedCategoryIds.map(id => ({ id }))
                            }
                        } : {}),
                    },
                    include: {
                        managedCategories: true
                    }
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
        removeMany(ids) {
            return this.prisma.user.deleteMany({
                where: {
                    id: { in: ids },
                },
            });
        }
        async getStats() {
            const total = await this.prisma.user.count();
            const active = await this.prisma.user.count({ where: { status: 'ACTIVE' } });
            const inactive = await this.prisma.user.count({ where: { status: 'INACTIVE' } });
            const admin = await this.prisma.user.count({ where: { role: 'ADMIN' } });
            const user = await this.prisma.user.count({ where: { role: 'USER' } });
            return {
                total,
                active,
                inactive,
                admin,
                user,
            };
        }
        async updateRefreshToken(id, hashedRefreshToken) {
            return this.prisma.user.update({
                where: { id },
                data: { hashedRefreshToken },
            });
        }
    };
    return UsersService = _classThis;
})();
export { UsersService };
