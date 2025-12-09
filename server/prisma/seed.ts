import { PrismaClient } from 'generated/prisma/client';
import * as bcrypt from 'bcrypt';
import { removeAccents } from '../src/common/utils/string.utils';

import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';

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

    // Invoices
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

    // Translations
    console.log('Seeding translations...');
    const translations = [
        { key: 'HELLO', locale: 'en', value: 'Hello' },
        { key: 'HELLO', locale: 'vi', value: 'Xin chào' },
        { key: 'WELCOME', locale: 'en', value: 'Welcome to VibeCode' },
        { key: 'WELCOME', locale: 'vi', value: 'Chào mừng đến với VibeCode' },
        { key: 'LOGIN', locale: 'en', value: 'Login' },
        { key: 'LOGIN', locale: 'vi', value: 'Đăng nhập' },
        { key: 'USER_NOT_FOUND', locale: 'en', value: 'User not found' },
        { key: 'USER_NOT_FOUND', locale: 'vi', value: 'Người dùng không tồn tại' },
        { key: 'FORBIDDEN', locale: 'en', value: 'Access denied' },
        { key: 'FORBIDDEN', locale: 'vi', value: 'Truy cập bị từ chối' },
        // Auth
        { key: 'AUTH_ACCOUNT_INACTIVE', locale: 'en', value: 'Your account is inactive. Please contact administrator.' },
        { key: 'AUTH_ACCOUNT_INACTIVE', locale: 'vi', value: 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.' },
        { key: 'AUTH_ACCESS_DENIED', locale: 'en', value: 'Access Denied' },
        { key: 'AUTH_ACCESS_DENIED', locale: 'vi', value: 'Truy cập bị từ chối' },
        { key: 'AUTH_INVALID_CREDENTIALS', locale: 'en', value: 'Invalid credentials' },
        { key: 'AUTH_INVALID_CREDENTIALS', locale: 'vi', value: 'Thông tin đăng nhập không chính xác' },
        // Users
        { key: 'USER_EMAIL_EXISTS', locale: 'en', value: 'Email already exists' },
        { key: 'USER_EMAIL_EXISTS', locale: 'vi', value: 'Email đã tồn tại' },
        // Posts
        { key: 'POST_NOT_FOUND', locale: 'en', value: 'Post not found' },
        { key: 'POST_NOT_FOUND', locale: 'vi', value: 'Bài viết không tìm thấy' },
        { key: 'POST_UPDATE_FORBIDDEN', locale: 'en', value: 'You do not have permission to update this post' },
        { key: 'POST_UPDATE_FORBIDDEN', locale: 'vi', value: 'Bạn không có quyền chỉnh sửa bài viết này' },
        { key: 'POST_DELETE_FORBIDDEN', locale: 'en', value: 'You do not have permission to delete this post' },
        { key: 'POST_DELETE_FORBIDDEN', locale: 'vi', value: 'Bạn không có quyền xóa bài viết này' },
        // Invoices
        { key: 'INVOICE_DELETE_PAID_ERROR', locale: 'en', value: 'Cannot delete an invoice with status PAID' },
        { key: 'INVOICE_DELETE_PAID_ERROR', locale: 'vi', value: 'Không thể xóa hóa đơn đã thanh toán' },
    ];

    for (const t of translations) {
        // Use raw SQL to upsert because generated client model accessor might be missing
        await prisma.$executeRaw`
            INSERT INTO "Translation" ("id", "key", "locale", "value", "createdAt", "updatedAt")
            VALUES (${uuidv4()}, ${t.key}, ${t.locale}, ${t.value}, NOW(), NOW())
            ON CONFLICT ("key", "locale") 
            DO UPDATE SET "value" = ${t.value}, "updatedAt" = NOW();
        `;
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
