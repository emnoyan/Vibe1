import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from 'generated/prisma/client';
import { CaslAbilityFactory, Action } from '../casl/casl-ability.factory.js';
import { subject } from '@casl/ability';
import { I18nService, I18nContext } from 'nestjs-i18n';

import { removeAccents } from '../common/utils/string.utils.js';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private abilityFactory: CaslAbilityFactory,
    private readonly i18n: I18nService
  ) { }

  async onModuleInit() {
    const posts = await this.prisma.post.findMany({
      select: { id: true, title: true, content: true, searchText: true },
    });

    for (const post of posts) {
      const newSearchText = removeAccents((post.title || '') + ' ' + (post.content || ''));
      if (post.searchText !== newSearchText) {
        await this.prisma.post.update({
          where: { id: post.id },
          data: { searchText: newSearchText },
        });
      }
    }
  }

  create(createPostDto: CreatePostDto, authorId: number) {
    const searchText = removeAccents((createPostDto.title || '') + ' ' + (createPostDto.content || ''));
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        authorId,
        searchText,
      },
    });
  }

  findAll(params?: {
    q?: string;
    category?: string;
    categoryId?: number;
    authorId?: number;
    published?: boolean | string;
    skip?: number;
    take?: number;
    orderBy?: Prisma.PostOrderByWithRelationInput;
    where?: Prisma.PostWhereInput; // Allow override
  }) {
    const { q, category, categoryId, authorId, published, skip, take, orderBy, where: explicitWhere } = params || {};

    const isPublished = published === 'true' || published === true ? true : published === 'false' || published === false ? false : undefined;

    const where: Prisma.PostWhereInput = explicitWhere || {
      AND: [
        category ? { category: { slug: { equals: category, mode: 'insensitive' } } } : {},
        categoryId ? { categoryId: Number(categoryId) } : {},
        authorId ? { authorId } : {},
        isPublished !== undefined ? { published: isPublished } : {},
        q ? {
          searchText: { contains: removeAccents(q), mode: 'insensitive' }
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

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, name: true, email: true } },
        category: true,
      },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto, user: any) {
    const post = await this.findOne(id);
    if (!post) throw new NotFoundException(I18nContext.current()?.t('posts.not_found'));

    const ability = this.abilityFactory.createForUser(user);
    if (!ability.can(Action.Update, subject('Post', post))) {
      throw new ForbiddenException(I18nContext.current()?.t('posts.update_forbidden'));
    }

    const searchText = removeAccents(
      (updatePostDto.title !== undefined ? updatePostDto.title : post.title) + ' ' +
      (updatePostDto.content !== undefined ? updatePostDto.content : (post.content || ''))
    );

    return this.prisma.post.update({
      where: { id },
      data: {
        ...updatePostDto,
        searchText,
      },
    });
  }

  async remove(id: number, user: any) {
    const post = await this.findOne(id);
    if (!post) throw new NotFoundException(I18nContext.current()?.t('posts.not_found'));

    const ability = this.abilityFactory.createForUser(user);
    if (!ability.can(Action.Delete, subject('Post', post))) {
      throw new ForbiddenException(I18nContext.current()?.t('posts.delete_forbidden'));
    }

    return this.prisma.post.delete({
      where: { id },
    });
  }
}
