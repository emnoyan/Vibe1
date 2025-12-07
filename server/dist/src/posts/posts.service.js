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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const casl_ability_factory_js_1 = require("../casl/casl-ability.factory.js");
const ability_1 = require("@casl/ability");
const string_utils_js_1 = require("../common/utils/string.utils.js");
let PostsService = class PostsService {
    prisma;
    abilityFactory;
    constructor(prisma, abilityFactory) {
        this.prisma = prisma;
        this.abilityFactory = abilityFactory;
    }
    async onModuleInit() {
        const posts = await this.prisma.post.findMany({
            select: { id: true, title: true, content: true, searchText: true },
        });
        for (const post of posts) {
            const newSearchText = (0, string_utils_js_1.removeAccents)((post.title || '') + ' ' + (post.content || ''));
            if (post.searchText !== newSearchText) {
                await this.prisma.post.update({
                    where: { id: post.id },
                    data: { searchText: newSearchText },
                });
            }
        }
    }
    create(createPostDto, authorId) {
        const searchText = (0, string_utils_js_1.removeAccents)((createPostDto.title || '') + ' ' + (createPostDto.content || ''));
        return this.prisma.post.create({
            data: {
                ...createPostDto,
                authorId,
                searchText,
            },
        });
    }
    findAll(params) {
        const { q, category, categoryId, authorId, published, skip, take, orderBy, where: explicitWhere } = params || {};
        const isPublished = published === 'true' || published === true ? true : published === 'false' || published === false ? false : undefined;
        const where = explicitWhere || {
            AND: [
                category ? { category: { slug: { equals: category, mode: 'insensitive' } } } : {},
                categoryId ? { categoryId: Number(categoryId) } : {},
                authorId ? { authorId } : {},
                isPublished !== undefined ? { published: isPublished } : {},
                q ? {
                    searchText: { contains: (0, string_utils_js_1.removeAccents)(q), mode: 'insensitive' }
                } : {},
            ],
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
            throw new common_1.NotFoundException('Post not found');
        const ability = this.abilityFactory.createForUser(user);
        if (!ability.can(casl_ability_factory_js_1.Action.Update, (0, ability_1.subject)('Post', post))) {
            throw new common_1.ForbiddenException('You do not have permission to update this post');
        }
        const searchText = (0, string_utils_js_1.removeAccents)((updatePostDto.title !== undefined ? updatePostDto.title : post.title) + ' ' +
            (updatePostDto.content !== undefined ? updatePostDto.content : (post.content || '')));
        return this.prisma.post.update({
            where: { id },
            data: {
                ...updatePostDto,
                searchText,
            },
        });
    }
    async remove(id, user) {
        const post = await this.findOne(id);
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        const ability = this.abilityFactory.createForUser(user);
        if (!ability.can(casl_ability_factory_js_1.Action.Delete, (0, ability_1.subject)('Post', post))) {
            throw new common_1.ForbiddenException('You do not have permission to delete this post');
        }
        return this.prisma.post.delete({
            where: { id },
        });
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        casl_ability_factory_js_1.CaslAbilityFactory])
], PostsService);
//# sourceMappingURL=posts.service.js.map