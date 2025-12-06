import { PureAbility } from '@casl/ability';
import { Role } from '@prisma/client';
export declare enum Action {
    Manage = "manage",
    Create = "create",
    Read = "read",
    Update = "update",
    Delete = "delete"
}
type Subjects = 'User' | 'all';
export type AppAbility = PureAbility<[Action, Subjects]>;
export declare class CaslAbilityFactory {
    createForUser(user: {
        id: number;
        role: Role;
    }): AppAbility;
}
export {};
