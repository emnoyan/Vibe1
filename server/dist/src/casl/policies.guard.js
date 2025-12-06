var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from './casl-ability.factory.js';
import { CHECK_POLICIES_KEY } from './policy.decorator.js';
let PoliciesGuard = class PoliciesGuard {
    reflector;
    caslAbilityFactory;
    constructor(reflector, caslAbilityFactory) {
        this.reflector = reflector;
        this.caslAbilityFactory = caslAbilityFactory;
    }
    async canActivate(context) {
        const policyHandlers = this.reflector.get(CHECK_POLICIES_KEY, context.getHandler()) || [];
        const { user } = context.switchToHttp().getRequest();
        const ability = this.caslAbilityFactory.createForUser(user);
        return policyHandlers.every((handler) => this.execPolicyHandler(handler, ability));
    }
    execPolicyHandler(handler, ability) {
        if (typeof handler === 'function') {
            return handler(ability);
        }
        return handler.handle(ability);
    }
};
PoliciesGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Reflector,
        CaslAbilityFactory])
], PoliciesGuard);
export { PoliciesGuard };
//# sourceMappingURL=policies.guard.js.map