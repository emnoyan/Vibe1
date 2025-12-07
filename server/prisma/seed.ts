import { PrismaClient } from 'generated/prisma/client';
import * as bcrypt from 'bcrypt';
import { removeAccents } from '../src/common/utils/string.utils';

import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const url = new URL(process.env.DATABASE_URL!);
url.searchParams.delete('sslmode');
const connectionString = url.toString();

const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const password = await bcrypt.hash('password123', 10);

    // Users
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin User',
            password,
            role: 'ADMIN',
            status: 'ACTIVE',
            searchText: removeAccents('Admin User admin@example.com'),
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
            searchText: removeAccents('Moderator User mod@example.com'),
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
            searchText: removeAccents('Regular User user@example.com'),
        },
    });

    // Categories
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

    // Assign Mod to Tech
    await prisma.user.update({
        where: { id: mod.id },
        data: {
            managedCategories: {
                connect: { id: tech.id },
            },
        },
    });

    // Posts
    // Clean up existing posts to avoid duplicates if running multiple times?
    // Or just create new ones.

    const post1 = await prisma.post.findFirst({ where: { title: 'Welcome to VibeCode' } });
    if (!post1) {
        await prisma.post.create({
            data: {
                title: 'Welcome to VibeCode',
                content: 'This is the first admin post about Technology.',
                published: true,
                authorId: admin.id,
                categoryId: tech.id,
                searchText: removeAccents('Welcome to VibeCode This is the first admin post about Technology.'),
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
                searchText: removeAccents('Mod Life Update This is a post by the moderator about their Lifestyle.'),
            },
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
