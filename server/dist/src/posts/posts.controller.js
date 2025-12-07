"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const create_post_dto_1 = require("./dto/create-post.dto");
const update_post_dto_1 = require("./dto/update-post.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const policies_guard_1 = require("../casl/policies.guard");
const check_policies_decorator_1 = require("../casl/check-policies.decorator");
const casl_ability_factory_1 = require("../casl/casl-ability.factory");
const public_decorator_1 = require("../auth/public.decorator");
const ability_1 = require("@casl/ability");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const client_1 = require("../../generated/prisma/client");
let PostsController = class PostsController {
    postsService;
    abilityFactory;
    constructor(postsService, abilityFactory) {
        this.postsService = postsService;
        this.abilityFactory = abilityFactory;
    }
    findAllPublic(category, q) {
        return this.postsService.findAll({
            published: true,
            category,
            q,
            orderBy: { createdAt: 'desc' }
        });
    }
    async findOnePublic(id) {
        const post = await this.postsService.findOne(+id);
        if (!post || !post.published)
            throw new common_1.NotFoundException();
        return post;
    }
    create(createPostDto, req) {
        return this.postsService.create(createPostDto, req.user.id);
    }
    async findAll(req, query) {
        const user = req.user;
        const ability = this.abilityFactory.createForUser(user);
        if (!ability.can(casl_ability_factory_1.Action.Read, 'Post')) {
            throw new common_1.ForbiddenException('Cannot read posts');
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
            throw new common_1.NotFoundException();
        const ability = this.abilityFactory.createForUser(req.user);
        if (!ability.can(casl_ability_factory_1.Action.Read, (0, ability_1.subject)('Post', post))) {
            throw new common_1.ForbiddenException('Cannot access this post');
        }
        return post;
    }
    async update(id, updatePostDto, req) {
        const post = await this.postsService.findOne(+id);
        if (!post)
            throw new common_1.NotFoundException();
        return this.postsService.update(+id, updatePostDto, req.user);
    }
    async remove(id, req) {
        const post = await this.postsService.findOne(+id);
        if (!post)
            throw new common_1.NotFoundException();
        return this.postsService.remove(+id, req.user);
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('public'),
    __param(0, (0, common_1.Query)('category')),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findAllPublic", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('public/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "findOnePublic", null);
__decorate([
    (0, common_1.UseGuards)(policies_guard_1.PoliciesGuard),
    (0, check_policies_decorator_1.CheckPolicies)((ability) => ability.can(casl_ability_factory_1.Action.Create, 'Post')),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.MOD),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_post_dto_1.UpdatePostDto, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.MOD),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "remove", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)('posts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [posts_service_1.PostsService,
        casl_ability_factory_1.CaslAbilityFactory])
], PostsController);
//# sourceMappingURL=posts.controller.js.map