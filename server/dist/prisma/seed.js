"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../generated/prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const string_utils_1 = require("../src/common/utils/string.utils");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const url = new URL(process.env.DATABASE_URL);
url.searchParams.delete('sslmode');
const connectionString = url.toString();
const pool = new pg_1.Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
});
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    const password = await bcrypt.hash('password123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin User',
            password,
            role: 'ADMIN',
            status: 'ACTIVE',
            searchText: (0, string_utils_1.removeAccents)('Admin User admin@example.com'),
        },
    });
    const mod = await prisma.user.upsert({
        where: { email: 'mod@example.com' },
        update: {},
        create: {
            email: 'mod@example.com',
            name: 'Moderator User',
            password,
            role: 'MOD',
            status: 'ACTIVE',
            searchText: (0, string_utils_1.removeAccents)('Moderator User mod@example.com'),
        },
    });
    const user = await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {},
        create: {
            email: 'user@example.com',
            name: 'Regular User',
            password,
            role: 'USER',
            status: 'ACTIVE',
            searchText: (0, string_utils_1.removeAccents)('Regular User user@example.com'),
        },
    });
    const tech = await prisma.category.upsert({
        where: { slug: 'tech' },
        update: {},
        create: { name: 'Technology', slug: 'tech' },
    });
    const life = await prisma.category.upsert({
        where: { slug: 'life' },
        update: {},
        create: { name: 'Lifestyle', slug: 'life' },
    });
    await prisma.user.update({
        where: { id: mod.id },
        data: {
            managedCategories: {
                connect: { id: tech.id },
            },
        },
    });
    const post1 = await prisma.post.findFirst({ where: { title: 'Welcome to VibeCode' } });
    if (!post1) {
        await prisma.post.create({
            data: {
                title: 'Welcome to VibeCode',
                content: 'This is the first admin post about Technology.',
                published: true,
                authorId: admin.id,
                categoryId: tech.id,
                searchText: (0, string_utils_1.removeAccents)('Welcome to VibeCode This is the first admin post about Technology.'),
            },
        });
    }
    const post2 = await prisma.post.findFirst({ where: { title: 'Mod Life Update' } });
    if (!post2) {
        await prisma.post.create({
            data: {
                title: 'Mod Life Update',
                content: 'This is a post by the moderator about their Lifestyle.',
                published: true,
                authorId: mod.id,
                categoryId: life.id,
                searchText: (0, string_utils_1.removeAccents)('Mod Life Update This is a post by the moderator about their Lifestyle.'),
            },
        });
    }
    const invoice1 = await prisma.invoice.findFirst({ where: { invoiceNumber: '20231201/0001' } });
    if (!invoice1) {
        await prisma.invoice.create({
            data: {
                customerName: 'John Doe',
                customerEmail: 'john@example.com',
                status: 'PENDING',
                invoiceNumber: '20231201/0001',
                invoiceDate: new Date('2023-12-01'),
                total: 150.00,
                items: {
                    create: [
                        { description: 'Web Design', quantity: 1, price: 100.00, total: 100.00 },
                        { description: 'Hosting', quantity: 1, price: 50.00, total: 50.00 },
                    ]
                }
            }
        });
    }
    const invoice2 = await prisma.invoice.findFirst({ where: { invoiceNumber: '20231202/0001' } });
    if (!invoice2) {
        await prisma.invoice.create({
            data: {
                customerName: 'Jane Smith',
                customerEmail: 'jane@example.com',
                status: 'PAID',
                invoiceNumber: '20231202/0001',
                invoiceDate: new Date('2023-12-02'),
                total: 200.00,
                items: {
                    create: [
                        { description: 'Consulting', quantity: 2, price: 100.00, total: 200.00 },
                    ]
                }
            }
        });
    }
    console.log('Seed data created.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map