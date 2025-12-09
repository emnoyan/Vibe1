"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const bcrypt = __importStar(require("bcrypt"));
const user_entity_js_1 = require("./entities/user.entity.js");
const client_1 = require("../../generated/prisma/client");
const string_utils_js_1 = require("../common/utils/string.utils.js");
const nestjs_i18n_1 = require("nestjs-i18n");
let UsersService = class UsersService {
    prisma;
    i18n;
    constructor(prisma, i18n) {
        this.prisma = prisma;
        this.i18n = i18n;
    }
    async onModuleInit() {
        const users = await this.prisma.user.findMany({
            select: { id: true, name: true, email: true, searchText: true },
        });
        for (const user of users) {
            const newSearchText = (0, string_utils_js_1.removeAccents)((user.name || '') + ' ' + user.email);
            if (user.searchText !== newSearchText) {
                await this.prisma.user.update({
                    where: { id: user.id },
                    data: { searchText: newSearchText },
                });
            }
        }
    }
    async create(createUserDto) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
        const searchText = (0, string_utils_js_1.removeAccents)((createUserDto.name || '') + ' ' + createUserDto.email);
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
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new common_1.ConflictException(nestjs_i18n_1.I18nContext.current()?.t('users.email_exists'));
            }
            throw error;
        }
    }
    async findAll(params) {
        const { q, role, status, sortBy, sortOrder } = params || {};
        const normalizedQ = q ? (0, string_utils_js_1.removeAccents)(q) : undefined;
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
        return users.map((user) => new user_entity_js_1.UserEntity(user));
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { managedCategories: true }
        });
        if (user) {
            return new user_entity_js_1.UserEntity(user);
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
        if (updateUserDto.password === '' || updateUserDto.password === undefined || updateUserDto.password === null) {
            delete updateUserDto.password;
        }
        if (updateUserDto.password) {
            const salt = await bcrypt.genSalt();
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
        }
        let searchText;
        if (updateUserDto.name !== undefined || updateUserDto.email !== undefined) {
            const currentUser = await this.prisma.user.findUnique({ where: { id } });
            if (currentUser) {
                const newName = updateUserDto.name !== undefined ? updateUserDto.name : currentUser.name;
                const newEmail = updateUserDto.email !== undefined ? updateUserDto.email : currentUser.email;
                searchText = (0, string_utils_js_1.removeAccents)((newName || '') + ' ' + newEmail);
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
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new common_1.ConflictException(nestjs_i18n_1.I18nContext.current()?.t('users.email_exists'));
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
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        nestjs_i18n_1.I18nService])
], UsersService);
//# sourceMappingURL=users.service.js.map