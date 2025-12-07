import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): import("../../generated/prisma/models.js").Prisma__CategoryClient<{
        id: number;
        name: string;
        slug: string;
    }, never, import("@prisma/client/runtime/client.js").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    findAll(): import("../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        id: number;
        name: string;
        slug: string;
    }[]>;
    findOne(id: number): import("../../generated/prisma/models.js").Prisma__CategoryClient<{
        id: number;
        name: string;
        slug: string;
    } | null, null, import("@prisma/client/runtime/client.js").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): import("../../generated/prisma/models.js").Prisma__CategoryClient<{
        id: number;
        name: string;
        slug: string;
    }, never, import("@prisma/client/runtime/client.js").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
    remove(id: number): import("../../generated/prisma/models.js").Prisma__CategoryClient<{
        id: number;
        name: string;
        slug: string;
    }, never, import("@prisma/client/runtime/client.js").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
}
