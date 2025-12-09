import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
        role: import("../../generated/prisma/enums.js").Role;
        status: import("../../generated/prisma/enums.js").UserStatus;
        searchText: string;
        hashedRefreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    findAll(q?: string, role?: 'ADMIN' | 'USER', status?: 'ACTIVE' | 'INACTIVE', sortBy?: string, sortOrder?: 'asc' | 'desc'): Promise<import("./entities/user.entity.js").UserEntity[]>;
    getStats(): Promise<{
        total: number;
        active: number;
        inactive: number;
        admin: number;
        user: number;
    }>;
    findOne(id: string): Promise<import("./entities/user.entity.js").UserEntity | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        managedCategories: {
            name: string;
            id: number;
            slug: string;
        }[];
    } & {
        email: string;
        password: string;
        name: string | null;
        role: import("../../generated/prisma/enums.js").Role;
        status: import("../../generated/prisma/enums.js").UserStatus;
        searchText: string;
        hashedRefreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: string): import("../../generated/prisma/models.js").Prisma__UserClient<{
        email: string;
        password: string;
        name: string | null;
        role: import("../../generated/prisma/enums.js").Role;
        status: import("../../generated/prisma/enums.js").UserStatus;
        searchText: string;
        hashedRefreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/client.js").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    removeMany(body: {
        ids: number[];
    }): import("../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<import("../../generated/prisma/internal/prismaNamespace.js").BatchPayload>;
}
