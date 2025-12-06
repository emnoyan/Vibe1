import { AbilityBuilder, PureAbility, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User, Role } from '@prisma/client';

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

type Subjects = 'User' | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: { id: number; role: Role }) {
        const { can, cannot, build } = new AbilityBuilder<AppAbility>(PureAbility as AbilityClass<AppAbility>);

        if (user.role === Role.ADMIN) {
            can(Action.Manage, 'all'); // read-write access to everything
        } else {
            can(Action.Read, 'User'); // read-only access to User
        }

        return build({
            // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types
            detectSubjectType: (item) => 'User',
        });
    }
}
