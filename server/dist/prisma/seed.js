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
const uuid_1 = require("uuid");
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
    console.log('Seeding translations...');
    await prisma.$executeRaw `DELETE FROM "Translation" WHERE "key" IN ('INVOICE_DELETE_PAID_ERROR', 'AUTH_ACCOUNT_INACTIVE', 'AUTH_INVALID_CREDENTIALS', 'USER_EMAIL_EXISTS', 'POST_NOT_FOUND')`;
    const translations = [
        { key: 'common.hello', locale: 'en', value: 'Hello' },
        { key: 'common.hello', locale: 'vi', value: 'Xin chào' },
        { key: 'common.welcome', locale: 'en', value: 'Welcome to VibeCode' },
        { key: 'common.welcome', locale: 'vi', value: 'Chào mừng đến với VibeCode' },
        { key: 'common.login', locale: 'en', value: 'Login' },
        { key: 'common.login', locale: 'vi', value: 'Đăng nhập' },
        { key: 'common.total_invoices', locale: 'en', value: 'Total Invoices' },
        { key: 'common.total_invoices', locale: 'vi', value: 'Tổng hóa đơn' },
        { key: 'common.date', locale: 'en', value: 'Date' },
        { key: 'common.date', locale: 'vi', value: 'Ngày' },
        { key: 'common.customer', locale: 'en', value: 'Customer' },
        { key: 'common.customer', locale: 'vi', value: 'Khách hàng' },
        { key: 'common.status', locale: 'en', value: 'Status' },
        { key: 'common.status', locale: 'vi', value: 'Trạng thái' },
        { key: 'common.total', locale: 'en', value: 'Total' },
        { key: 'common.total', locale: 'vi', value: 'Tổng cộng' },
        { key: 'users.not_found', locale: 'en', value: 'User not found' },
        { key: 'users.not_found', locale: 'vi', value: 'Người dùng không tồn tại' },
        { key: 'common.forbidden', locale: 'en', value: 'Access denied' },
        { key: 'common.forbidden', locale: 'vi', value: 'Truy cập bị từ chối' },
        { key: 'auth.account_inactive', locale: 'en', value: 'Your account is inactive. Please contact administrator.' },
        { key: 'auth.account_inactive', locale: 'vi', value: 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.' },
        { key: 'auth.access_denied', locale: 'en', value: 'Access Denied' },
        { key: 'auth.access_denied', locale: 'vi', value: 'Truy cập bị từ chối' },
        { key: 'auth.invalid_credentials', locale: 'en', value: 'Invalid credentials' },
        { key: 'auth.invalid_credentials', locale: 'vi', value: 'Thông tin đăng nhập không chính xác' },
        { key: 'users.email_exists', locale: 'en', value: 'Email already exists' },
        { key: 'users.email_exists', locale: 'vi', value: 'Email đã tồn tại' },
        { key: 'posts.not_found', locale: 'en', value: 'Post not found' },
        { key: 'posts.not_found', locale: 'vi', value: 'Bài viết không tìm thấy' },
        { key: 'posts.update_forbidden', locale: 'en', value: 'You do not have permission to update this post' },
        { key: 'posts.update_forbidden', locale: 'vi', value: 'Bạn không có quyền chỉnh sửa bài viết này' },
        { key: 'posts.delete_forbidden', locale: 'en', value: 'You do not have permission to delete this post' },
        { key: 'posts.delete_forbidden', locale: 'vi', value: 'Bạn không có quyền xóa bài viết này' },
        { key: 'invoices.delete_paid_error', locale: 'en', value: 'Cannot delete an invoice with status PAID' },
        { key: 'invoices.delete_paid_error', locale: 'vi', value: 'Không thể xóa hóa đơn đã thanh toán' },
        { key: 'validation.required', locale: 'en', value: 'This field is required' },
        { key: 'validation.required', locale: 'vi', value: 'Trường này là bắt buộc' },
        { key: 'validation.email', locale: 'en', value: 'Please enter a valid email address' },
        { key: 'validation.email', locale: 'vi', value: 'Vui lòng nhập địa chỉ email hợp lệ' },
        { key: 'validation.min', locale: 'en', value: 'Must be at least {min} characters' },
        { key: 'validation.min', locale: 'vi', value: 'Phải có ít nhất {min} ký tự' },
        { key: 'button.save', locale: 'en', value: 'Save' },
        { key: 'button.save', locale: 'vi', value: 'Lưu' },
        { key: 'button.cancel', locale: 'en', value: 'Cancel' },
        { key: 'button.cancel', locale: 'vi', value: 'Hủy' },
        { key: 'button.delete', locale: 'en', value: 'Delete' },
        { key: 'button.delete', locale: 'vi', value: 'Xóa' },
        { key: 'button.create', locale: 'en', value: 'Create' },
        { key: 'button.create', locale: 'vi', value: 'Tạo mới' },
        { key: 'button.edit', locale: 'en', value: 'Edit' },
        { key: 'button.edit', locale: 'vi', value: 'Sửa' },
        { key: 'button.search', locale: 'en', value: 'Search' },
        { key: 'button.search', locale: 'vi', value: 'Tìm kiếm' },
        { key: 'message.success', locale: 'en', value: 'Success' },
        { key: 'message.success', locale: 'vi', value: 'Thành công' },
        { key: 'message.error', locale: 'en', value: 'Error' },
        { key: 'message.error', locale: 'vi', value: 'Lỗi' },
        { key: 'message.confirm_delete', locale: 'en', value: 'Are you sure you want to delete this item?' },
        { key: 'message.confirm_delete', locale: 'vi', value: 'Bạn có chắc chắn muốn xóa mục này không?' },
        { key: 'message.loading', locale: 'en', value: 'Loading...' },
        { key: 'message.loading', locale: 'vi', value: 'Đang tải...' },
        { key: 'message.no_data', locale: 'en', value: 'No data found' },
        { key: 'message.no_data', locale: 'vi', value: 'Không tìm thấy dữ liệu' },
    ];
    for (const t of translations) {
        await prisma.$executeRaw `
            INSERT INTO "Translation" ("id", "key", "locale", "value", "createdAt", "updatedAt")
            VALUES (${(0, uuid_1.v4)()}, ${t.key}, ${t.locale}, ${t.value}, NOW(), NOW())
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
//# sourceMappingURL=seed.js.map