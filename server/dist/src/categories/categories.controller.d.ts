import { CategoriesService } from './categories.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): import("../../generated/prisma/models.js").Prisma__CategoryClient<{
        id: number;
        name: string;
        slug: string;
    }, never, import("@prisma/client/runtime/client.js").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    findAll(q?: string, sortBy?: string, sortOrder?: 'asc' | 'desc'): import("../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        id: number;
        name: string;
        slug: string;
    }[]>;
    findOne(id: string): import("../../generated/prisma/models.js").Prisma__CategoryClient<{
        id: number;
        name: string;
        slug: string;
    } | null, null, import("@prisma/client/runtime/client.js").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): import("../../generated/prisma/models.js").Prisma__CategoryClient<{
        id: number;
        name: string;
        slug: string;
    }, never, import("@prisma/client/runtime/client.js").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    remove(id: string): import("../../generated/prisma/models.js").Prisma__CategoryClient<{
        id: number;
        name: string;
        slug: string;
    }, never, import("@prisma/client/runtime/client.js").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
}
