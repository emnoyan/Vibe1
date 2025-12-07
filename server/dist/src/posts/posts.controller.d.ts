import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
export declare class PostsController {
    private readonly postsService;
    private abilityFactory;
    constructor(postsService: PostsService, abilityFactory: CaslAbilityFactory);
    findAllPublic(category: string, q: string): import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<({
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
    findOnePublic(id: string): Promise<{
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
    }>;
    create(createPostDto: CreatePostDto, req: any): import("../../generated/prisma/models").Prisma__PostClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findAll(req: any, query: any): Promise<({
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
    findOne(id: string, req: any): Promise<{
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
    }>;
    update(id: string, updatePostDto: UpdatePostDto, req: any): Promise<{
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
    remove(id: string, req: any): Promise<{
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
