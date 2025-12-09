import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UserEntity } from './entities/user.entity.js';
import { Prisma } from 'generated/prisma/client';
import { I18nService } from 'nestjs-i18n';
export declare class UsersService {
    private prisma;
    private readonly i18n;
    constructor(prisma: PrismaService, i18n: I18nService);
    onModuleInit(): Promise<void>;
    create(createUserDto: CreateUserDto): Promise<{
        managedCategories: {
            id: number;
            name: string;
            slug: string;
        }[];
    } & {
        id: number;
        email: string;
        password: string;
        name: string | null;
        role: import("generated/prisma/client").Role;
        status: import("generated/prisma/client").UserStatus;
        language: string;
        searchText: string;
        hashedRefreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(params?: {
        q?: string;
        role?: Prisma.EnumRoleFilter | 'ADMIN' | 'USER';
        status?: Prisma.EnumUserStatusFilter | 'ACTIVE' | 'INACTIVE';
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }): Promise<UserEntity[]>;
    findOne(id: number): Promise<UserEntity | null>;
    findOneByEmail(email: string): Promise<({
        managedCategories: {
            id: number;
            name: string;
            slug: string;
        }[];
    } & {
        id: number;
        email: string;
        password: string;
        name: string | null;
        role: import("generated/prisma/client").Role;
        status: import("generated/prisma/client").UserStatus;
        language: string;
        searchText: string;
        hashedRefreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        managedCategories: {
            id: number;
            name: string;
            slug: string;
        }[];
    } & {
        id: number;
        email: string;
        password: string;
        name: string | null;
        role: import("generated/prisma/client").Role;
        status: import("generated/prisma/client").UserStatus;
        language: string;
        searchText: string;
        hashedRefreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Prisma.Prisma__UserClient<{
        id: number;
        email: string;
        password: string;
        name: string | null;
        role: import("generated/prisma/client").Role;
        status: import("generated/prisma/client").UserStatus;
        language: string;
        searchText: string;
        hashedRefreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client.js").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    removeMany(ids: number[]): Prisma.PrismaPromise<Prisma.BatchPayload>;
    getStats(): Promise<{
        total: number;
        active: number;
        inactive: number;
        admin: number;
        user: number;
    }>;
    updateRefreshToken(id: number, hashedRefreshToken: string | null): Promise<{
        id: number;
        email: string;
        password: string;
        name: string | null;
        role: import("generated/prisma/client").Role;
        status: import("generated/prisma/client").UserStatus;
        language: string;
        searchText: string;
        hashedRefreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
