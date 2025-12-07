import { MongoAbility } from '@casl/ability';
import { User, Post, Category, Role } from '../../generated/prisma/client';
export declare enum Action {
    Manage = "manage",
    Create = "create",
    Read = "read",
    Update = "update",
    Delete = "delete"
}
type Subjects = 'User' | 'Post' | 'Category' | 'all' | User | Post | Category;
export type AppAbility = MongoAbility<[Action, Subjects]>;
export declare class CaslAbilityFactory {
    createForUser(user: {
        id: number;
        role: Role;
        managedCategoryIds?: number[];
    }): AppAbility;
}
export {};
