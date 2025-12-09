import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
export declare class PostsController {
    private readonly postsService;
    private abilityFactory;
    constructor(postsService: PostsService, abilityFactory: CaslAbilityFactory);
    findAllPublic(category: string, q: string): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        category: {
            id: number;
            name: string;
            slug: string;
        } | null;
        author: {
            id: number;
            email: string;
            name: string | null;
        } | null;
    } & {
        id: number;
        searchText: string;
        createdAt: Date;
        updatedAt: Date;
        published: boolean;
        title: string;
        content: string | null;
        image: string | null;
        authorId: number | null;
        categoryId: number | null;
    })[]>;
    findOnePublic(id: string): Promise<{
        category: {
            id: number;
            name: string;
            slug: string;
        } | null;
        author: {
            id: number;
            email: string;
            name: string | null;
        } | null;
    } & {
        id: number;
        searchText: string;
        createdAt: Date;
        updatedAt: Date;
        published: boolean;
        title: string;
        content: string | null;
        image: string | null;
        authorId: number | null;
        categoryId: number | null;
    }>;
    create(createPostDto: CreatePostDto, req: any): import("../../generated/prisma/models").Prisma__PostClient<{
        id: number;
        searchText: string;
        createdAt: Date;
        updatedAt: Date;
        published: boolean;
        title: string;
        content: string | null;
        image: string | null;
        authorId: number | null;
        categoryId: number | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findAll(req: any, query: any): Promise<({
        category: {
            id: number;
            name: string;
            slug: string;
        } | null;
        author: {
            id: number;
            email: string;
            name: string | null;
        } | null;
    } & {
        id: number;
        searchText: string;
        createdAt: Date;
        updatedAt: Date;
        published: boolean;
        title: string;
        content: string | null;
        image: string | null;
        authorId: number | null;
        categoryId: number | null;
    })[]>;
    findOne(id: string, req: any): Promise<{
        category: {
            id: number;
            name: string;
            slug: string;
        } | null;
        author: {
            id: number;
            email: string;
            name: string | null;
        } | null;
    } & {
        id: number;
        searchText: string;
        createdAt: Date;
        updatedAt: Date;
        published: boolean;
        title: string;
        content: string | null;
        image: string | null;
        authorId: number | null;
        categoryId: number | null;
    }>;
    update(id: string, updatePostDto: UpdatePostDto, req: any): Promise<{
        id: number;
        searchText: string;
        createdAt: Date;
        updatedAt: Date;
        published: boolean;
        title: string;
        content: string | null;
        image: string | null;
        authorId: number | null;
        categoryId: number | null;
    }>;
    remove(id: string, req: any): Promise<{
        id: number;
        searchText: string;
        createdAt: Date;
        updatedAt: Date;
        published: boolean;
        title: string;
        content: string | null;
        image: string | null;
        authorId: number | null;
        categoryId: number | null;
    }>;
}
