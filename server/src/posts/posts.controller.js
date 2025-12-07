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
import { Controller, Get, Post, Patch, Delete, UseGuards, ForbiddenException, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from '../casl/check-policies.decorator';
import { Action } from '../casl/casl-ability.factory';
import { Public } from '../auth/public.decorator';
import { subject } from '@casl/ability';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
let PostsController = (() => {
    let _classDecorators = [Controller('posts'), UseGuards(JwtAuthGuard, RolesGuard)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _findAllPublic_decorators;
    let _findOnePublic_decorators;
    let _create_decorators;
    let _findAll_decorators;
    let _findOne_decorators;
    let _update_decorators;
    let _remove_decorators;
    var PostsController = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _findAllPublic_decorators = [Public(), Get('public')];
            _findOnePublic_decorators = [Public(), Get('public/:id')];
            _create_decorators = [UseGuards(PoliciesGuard), CheckPolicies((ability) => ability.can(Action.Create, 'Post')), Post()];
            _findAll_decorators = [Get()];
            _findOne_decorators = [Get(':id')];
            _update_decorators = [Roles(Role.ADMIN, Role.MOD), Patch(':id')];
            _remove_decorators = [Roles(Role.ADMIN, Role.MOD), Delete(':id')];
            __esDecorate(this, null, _findAllPublic_decorators, { kind: "method", name: "findAllPublic", static: false, private: false, access: { has: obj => "findAllPublic" in obj, get: obj => obj.findAllPublic }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOnePublic_decorators, { kind: "method", name: "findOnePublic", static: false, private: false, access: { has: obj => "findOnePublic" in obj, get: obj => obj.findOnePublic }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: obj => "remove" in obj, get: obj => obj.remove }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PostsController = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        postsService = __runInitializers(this, _instanceExtraInitializers);
        abilityFactory;
        constructor(postsService, abilityFactory) {
            this.postsService = postsService;
            this.abilityFactory = abilityFactory;
        }
        findAllPublic(category) {
            return this.postsService.findAll({
                published: true,
                category,
                orderBy: { createdAt: 'desc' }
            });
        }
        async findOnePublic(id) {
            const post = await this.postsService.findOne(+id);
            if (!post || !post.published)
                throw new NotFoundException();
            return post;
        }
        create(createPostDto, req) {
            return this.postsService.create(createPostDto, req.user.id);
        }
        async findAll(req, query) {
            const user = req.user;
            const ability = this.abilityFactory.createForUser(user);
            if (!ability.can(Action.Read, 'Post')) {
                throw new ForbiddenException('Cannot read posts');
            }
            if (user.role === 'ADMIN') {
                return this.postsService.findAll(query);
            }
            if (user.role === 'MOD') {
                const where = {
                    OR: [
                        { authorId: user.id },
                        { categoryId: { in: user.managedCategoryIds || [] } }
                    ]
                };
                return this.postsService.findAll({
                    ...query,
                    where: {
                        AND: [
                            where,
                        ]
                    }
                });
            }
            return this.postsService.findAll({
                ...query,
                authorId: user.id
            });
        }
        async findOne(id, req) {
            const post = await this.postsService.findOne(+id);
            if (!post)
                throw new NotFoundException();
            const ability = this.abilityFactory.createForUser(req.user);
            if (!ability.can(Action.Read, subject('Post', post))) {
                throw new ForbiddenException('Cannot access this post');
            }
            return post;
        }
        async update(id, updatePostDto, req) {
            const post = await this.postsService.findOne(+id);
            if (!post)
                throw new NotFoundException();
            // Ability check is now also in Service, but we can keep or remove this one. 
            // The user said: "Authorize in Service". 
            // I made Service check mandatory. Controller check is redundant but harmless. 
            // I will keep it for now or just simplify.
            // Actually, to make it clean and rely on Service as requested:
            return this.postsService.update(+id, updatePostDto, req.user);
        }
        async remove(id, req) {
            const post = await this.postsService.findOne(+id);
            if (!post)
                throw new NotFoundException();
            return this.postsService.remove(+id, req.user);
        }
    };
    return PostsController = _classThis;
})();
export { PostsController };
