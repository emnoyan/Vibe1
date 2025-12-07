import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from '../casl/check-policies.decorator';
import { CaslAbilityFactory, Action, AppAbility } from '../casl/casl-ability.factory';
import { Public } from '../auth/public.decorator';
import { subject } from '@casl/ability';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../../generated/prisma/client';

@Controller('posts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private abilityFactory: CaslAbilityFactory
  ) { }

  @Public()
  @Get('public')
  findAllPublic(@Query('category') category: string, @Query('q') q: string) {
    return this.postsService.findAll({
      published: true,
      category,
      q,
      orderBy: { createdAt: 'desc' }
    });
  }

  @Public()
  @Get('public/:id')
  async findOnePublic(@Param('id') id: string) {
    const post = await this.postsService.findOne(+id);
    if (!post || !post.published) throw new NotFoundException();
    return post;
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, 'Post'))
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req: any) {
    return this.postsService.create(createPostDto, req.user.id);
  }

  @Get()
  async findAll(@Req() req: any, @Query() query: any) {
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

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    const post = await this.postsService.findOne(+id);
    if (!post) throw new NotFoundException();

    const ability = this.abilityFactory.createForUser(req.user);
    if (!ability.can(Action.Read, subject('Post', post))) {
      throw new ForbiddenException('Cannot access this post');
    }
    return post;
  }

  @Roles(Role.ADMIN, Role.MOD)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Req() req: any) {
    const post = await this.postsService.findOne(+id);
    if (!post) throw new NotFoundException();

    // Ability check is now also in Service, but we can keep or remove this one. 
    // The user said: "Authorize in Service". 
    // I made Service check mandatory. Controller check is redundant but harmless. 
    // I will keep it for now or just simplify.
    // Actually, to make it clean and rely on Service as requested:
    return this.postsService.update(+id, updatePostDto, req.user);
  }

  @Roles(Role.ADMIN, Role.MOD)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any) {
    const post = await this.postsService.findOne(+id);
    if (!post) throw new NotFoundException();

    return this.postsService.remove(+id, req.user);
  }
}
