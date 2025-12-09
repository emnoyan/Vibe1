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
            name: string;
            id: number;
            slug: string;
        }[];
    } & {
        email: string;
        password: string;
        name: string | null;
        role: import("generated/prisma/client").Role;
        status: import("generated/prisma/client").UserStatus;
        searchText: string;
        hashedRefreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
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
            name: string;
            id: number;
            slug: string;
        }[];
    } & {
        email: string;
        password: string;
        name: string | null;
        role: import("generated/prisma/client").Role;
        status: import("generated/prisma/client").UserStatus;
        searchText: string;
        hashedRefreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }) | null>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        managedCategories: {
            name: string;
            id: number;
            slug: string;
        }[];
    } & {
        email: string;
        password: string;
        name: string | null;
        role: import("generated/prisma/client").Role;
        status: import("generated/prisma/client").UserStatus;
        searchText: string;
        hashedRefreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: number): Prisma.Prisma__UserClient<{
        email: string;
        password: string;
        name: string | null;
        role: import("generated/prisma/client").Role;
        status: import("generated/prisma/client").UserStatus;
        searchText: string;
        hashedRefreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
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
        email: string;
        password: string;
        name: string | null;
        role: import("generated/prisma/client").Role;
        status: import("generated/prisma/client").UserStatus;
        searchText: string;
        hashedRefreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
