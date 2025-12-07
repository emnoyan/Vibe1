var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { PoliciesGuard } from '../casl/policies.guard.js';
import { CheckPolicies } from '../casl/check-policies.decorator.js';
import { Action } from '../casl/casl-ability.factory.js';
let UsersController = (() => {
    let _classDecorators = [Controller('users')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _create_decorators;
    let _findAll_decorators;
    let _getStats_decorators;
    let _findOne_decorators;
    let _update_decorators;
    let _remove_decorators;
    let _removeMany_decorators;
    var UsersController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _create_decorators = [Post(), UseGuards(JwtAuthGuard, PoliciesGuard), CheckPolicies((ability) => ability.can(Action.Create, 'User'))];
            _findAll_decorators = [Get(), UseGuards(JwtAuthGuard, PoliciesGuard), CheckPolicies((ability) => ability.can(Action.Read, 'User'))];
            _getStats_decorators = [Get('stats'), UseGuards(JwtAuthGuard, PoliciesGuard), CheckPolicies((ability) => ability.can(Action.Read, 'User'))];
            _findOne_decorators = [Get(':id'), UseGuards(JwtAuthGuard, PoliciesGuard), CheckPolicies((ability) => ability.can(Action.Read, 'User'))];
            _update_decorators = [Patch(':id'), UseGuards(JwtAuthGuard, PoliciesGuard), CheckPolicies((ability) => ability.can(Action.Update, 'User'))];
            _remove_decorators = [Delete(':id'), UseGuards(JwtAuthGuard, PoliciesGuard), CheckPolicies((ability) => ability.can(Action.Delete, 'User'))];
            _removeMany_decorators = [Post('bulk-delete'), UseGuards(JwtAuthGuard, PoliciesGuard), CheckPolicies((ability) => ability.can(Action.Delete, 'User'))];
            __esDecorate(this, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getStats_decorators, { kind: "method", name: "getStats", static: false, private: false, access: { has: obj => "getStats" in obj, get: obj => obj.getStats }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: obj => "remove" in obj, get: obj => obj.remove }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _removeMany_decorators, { kind: "method", name: "removeMany", static: false, private: false, access: { has: obj => "removeMany" in obj, get: obj => obj.removeMany }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            UsersController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        usersService = __runInitializers(this, _instanceExtraInitializers);
        constructor(usersService) {
            this.usersService = usersService;
        }
        create(createUserDto) {
            return this.usersService.create(createUserDto);
        }
        findAll(q, role, status, sortBy, sortOrder) {
            return this.usersService.findAll({ q, role, status, sortBy, sortOrder });
        }
        getStats() {
            return this.usersService.getStats();
        }
        findOne(id) {
            return this.usersService.findOne(+id);
        }
        update(id, updateUserDto) {
            return this.usersService.update(+id, updateUserDto);
        }
        remove(id) {
            return this.usersService.remove(+id);
        }
        removeMany(body) {
            return this.usersService.removeMany(body.ids);
        }
    };
    return UsersController = _classThis;
})();
export { UsersController };
