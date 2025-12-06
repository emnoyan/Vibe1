import { Role, UserStatus } from '@prisma/client';
export declare class UserEntity {
    id: number;
    email: string;
    password: string;
    name: string | null;
    role: Role;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
    constructor(partial: Partial<UserEntity>);
}
