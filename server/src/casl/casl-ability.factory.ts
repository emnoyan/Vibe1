import { AbilityBuilder, PureAbility, AbilityClass, ExtractSubjectType, InferSubjects, MongoAbility, createMongoAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User, Post, Category, Role } from '../../generated/prisma/client';

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

type Subjects = 'User' | 'Post' | 'Category' | 'all' | User | Post | Category;

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: { id: number; role: Role; managedCategoryIds?: number[] }) {
        const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

        // Base permissions
        can(Action.Read, 'Post');
        can(Action.Read, 'Category');
        can(Action.Create, 'Post');

        // Admin manages all
        if (user.role === Role.ADMIN) {
            can(Action.Manage, 'all');
        } else {
            // User manages own content
            can(Action.Manage, 'Post', { authorId: user.id });

            // Mod manages assigned categories - Attribute Based
            if (user.role === Role.MOD && user.managedCategoryIds && user.managedCategoryIds.length > 0) {
                can(Action.Manage, 'Post', { categoryId: { $in: user.managedCategoryIds } });
            }
        }

        return build({
            detectSubjectType: (item) => {
                if (typeof item === 'string') return item as any;
                if ('title' in item) return 'Post';
                if ('slug' in item) return 'Category';
                if ('email' in item) return 'User';
                return 'all';
            },
        });
    }
}
