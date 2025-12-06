import { Exclude } from 'class-transformer';
import { Role, UserStatus } from '@prisma/client';

export class UserEntity {
    id!: number;
    email!: string;

    @Exclude()
    password!: string;

    name!: string | null;
    role!: Role;
    status!: UserStatus;
    createdAt!: Date;
    updatedAt!: Date;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}

