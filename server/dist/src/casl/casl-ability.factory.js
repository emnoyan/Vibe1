"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaslAbilityFactory = exports.Action = void 0;
const ability_1 = require("@casl/ability");
const common_1 = require("@nestjs/common");
const client_1 = require("../../generated/prisma/client");
var Action;
(function (Action) {
    Action["Manage"] = "manage";
    Action["Create"] = "create";
    Action["Read"] = "read";
    Action["Update"] = "update";
    Action["Delete"] = "delete";
})(Action || (exports.Action = Action = {}));
let CaslAbilityFactory = class CaslAbilityFactory {
    createForUser(user) {
        const { can, cannot, build } = new ability_1.AbilityBuilder(ability_1.createMongoAbility);
        can(Action.Read, 'Post');
        can(Action.Read, 'Category');
        can(Action.Create, 'Post');
        if (user.role === client_1.Role.ADMIN) {
            can(Action.Manage, 'all');
        }
        else {
            can(Action.Manage, 'Post', { authorId: user.id });
            if (user.role === client_1.Role.MOD && user.managedCategoryIds && user.managedCategoryIds.length > 0) {
                can(Action.Manage, 'Post', { categoryId: { $in: user.managedCategoryIds } });
            }
        }
        return build({
            detectSubjectType: (item) => {
                if (typeof item === 'string')
                    return item;
                if ('title' in item)
                    return 'Post';
                if ('slug' in item)
                    return 'Category';
                if ('email' in item)
                    return 'User';
                return 'all';
            },
        });
    }
};
exports.CaslAbilityFactory = CaslAbilityFactory;
exports.CaslAbilityFactory = CaslAbilityFactory = __decorate([
    (0, common_1.Injectable)()
], CaslAbilityFactory);
//# sourceMappingURL=casl-ability.factory.js.map