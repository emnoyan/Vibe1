import { Exclude } from 'class-transformer';
import { Role, UserStatus } from '../../../generated/prisma/client';

export class UserEntity {
    id!: number;
    email!: string;

    @Exclude()
    password!: string;

    @Exclude()
    hashedRefreshToken!: string | null;

    @Exclude()
    searchText!: string;

    name!: string | null;
    role!: Role;
    status!: UserStatus;
    managedCategories?: any[];
    createdAt!: Date;
    updatedAt!: Date;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}

