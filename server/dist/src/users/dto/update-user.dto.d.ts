import { CreateUserDto } from './create-user.dto.js';
import { Role, UserStatus } from '../../../generated/prisma/client';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    role?: Role;
    status?: UserStatus;
    managedCategoryIds?: number[];
}
export {};
