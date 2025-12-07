import { Role, UserStatus } from '../../../generated/prisma/client';
export declare class UserEntity {
    id: number;
    email: string;
    password: string;
    hashedRefreshToken: string | null;
    searchText: string;
    name: string | null;
    role: Role;
    status: UserStatus;
    managedCategories?: any[];
    createdAt: Date;
    updatedAt: Date;
    constructor(partial: Partial<UserEntity>);
}
