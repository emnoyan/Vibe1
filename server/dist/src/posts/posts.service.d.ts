import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from 'generated/prisma/client';
import { CaslAbilityFactory } from '../casl/casl-ability.factory.js';
import { I18nService } from 'nestjs-i18n';
export declare class PostsService {
    private prisma;
    private abilityFactory;
    private readonly i18n;
    constructor(prisma: PrismaService, abilityFactory: CaslAbilityFactory, i18n: I18nService);
    onModuleInit(): Promise<void>;
    create(createPostDto: CreatePostDto, authorId: number): Prisma.Prisma__PostClient<{
        createdAt: Date;
        updatedAt: Date;
        published: boolean;
        title: string;
        content: string | null;
        image: string | null;
        searchText: string;
        id: number;
        authorId: number | null;
        categoryId: number | null;
    }, never, import("@prisma/client/runtime/client.js").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findAll(params?: {
        q?: string;
        category?: string;
        categoryId?: number;
        authorId?: number;
        published?: boolean | string;
        skip?: number;
        take?: number;
        orderBy?: Prisma.PostOrderByWithRelationInput;
        where?: Prisma.PostWhereInput;
    }): Prisma.PrismaPromise<({
        author: {
            id: number;
            name: string | null;
            email: string;
        } | null;
        category: {
            id: number;
            name: string;
            slug: string;
        } | null;
    } & {
        createdAt: Date;
        updatedAt: Date;
        published: boolean;
        title: string;
        content: string | null;
        image: string | null;
        searchText: string;
        id: number;
        authorId: number | null;
        categoryId: number | null;
    })[]>;
    findOne(id: number): Prisma.Prisma__PostClient<({
        author: {
            id: number;
            name: string | null;
            email: string;
        } | null;
        category: {
            id: number;
            name: string;
            slug: string;
        } | null;
    } & {
        createdAt: Date;
        updatedAt: Date;
        published: boolean;
        title: string;
        content: string | null;
        image: string | null;
        searchText: string;
        id: number;
        authorId: number | null;
        categoryId: number | null;
    }) | null, null, import("@prisma/client/runtime/client.js").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    update(id: number, updatePostDto: UpdatePostDto, user: any): Promise<{
        createdAt: Date;
        updatedAt: Date;
        published: boolean;
        title: string;
        content: string | null;
        image: string | null;
        searchText: string;
        id: number;
        authorId: number | null;
        categoryId: number | null;
    }>;
    remove(id: number, user: any): Promise<{
        createdAt: Date;
        updatedAt: Date;
        published: boolean;
        title: string;
        content: string | null;
        image: string | null;
        searchText: string;
        id: number;
        authorId: number | null;
        categoryId: number | null;
    }>;
}
