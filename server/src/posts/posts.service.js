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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Action } from '../casl/casl-ability.factory.js';
import { subject } from '@casl/ability';
let PostsService = (() => {
    let _classDecorators = [Injectable()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PostsService = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            PostsService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        prisma;
        abilityFactory;
        constructor(prisma, abilityFactory) {
            this.prisma = prisma;
            this.abilityFactory = abilityFactory;
        }
        create(createPostDto, authorId) {
            return this.prisma.post.create({
                data: {
                    ...createPostDto,
                    authorId,
                },
            });
        }
        findAll(params) {
            const { category, authorId, published, skip, take, orderBy, where: explicitWhere } = params || {};
            const where = explicitWhere || {
                ...(category ? { category: { slug: category } } : {}),
                ...(authorId ? { authorId } : {}),
                ...(published !== undefined ? { published } : {}),
            };
            return this.prisma.post.findMany({
                where,
                skip,
                take,
                orderBy,
                include: {
                    author: { select: { id: true, name: true, email: true } },
                    category: true,
                },
            });
        }
        findOne(id) {
            return this.prisma.post.findUnique({
                where: { id },
                include: {
                    author: { select: { id: true, name: true, email: true } },
                    category: true,
                },
            });
        }
        async update(id, updatePostDto, user) {
            const post = await this.findOne(id);
            if (!post)
                throw new NotFoundException('Post not found');
            const ability = this.abilityFactory.createForUser(user);
            if (!ability.can(Action.Update, subject('Post', post))) {
                throw new ForbiddenException('You do not have permission to update this post');
            }
            return this.prisma.post.update({
                where: { id },
                data: updatePostDto,
            });
        }
        async remove(id, user) {
            const post = await this.findOne(id);
            if (!post)
                throw new NotFoundException('Post not found');
            const ability = this.abilityFactory.createForUser(user);
            if (!ability.can(Action.Delete, subject('Post', post))) {
                throw new ForbiddenException('You do not have permission to delete this post');
            }
            return this.prisma.post.delete({
                where: { id },
            });
        }
    };
    return PostsService = _classThis;
})();
export { PostsService };
