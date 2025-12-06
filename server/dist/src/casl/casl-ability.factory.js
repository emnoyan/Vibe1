var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AbilityBuilder, PureAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
export var Action;
(function (Action) {
    Action["Manage"] = "manage";
    Action["Create"] = "create";
    Action["Read"] = "read";
    Action["Update"] = "update";
    Action["Delete"] = "delete";
})(Action || (Action = {}));
let CaslAbilityFactory = class CaslAbilityFactory {
    createForUser(user) {
        const { can, cannot, build } = new AbilityBuilder(PureAbility);
        if (user.role === Role.ADMIN) {
            can(Action.Manage, 'all');
        }
        else {
            can(Action.Read, 'User');
        }
        return build({
            detectSubjectType: (item) => 'User',
        });
    }
};
CaslAbilityFactory = __decorate([
    Injectable()
], CaslAbilityFactory);
export { CaslAbilityFactory };
//# sourceMappingURL=casl-ability.factory.js.map