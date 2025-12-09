"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const nestjs_i18n_1 = require("nestjs-i18n");
let InvoicesService = class InvoicesService {
    prisma;
    i18n;
    constructor(prisma, i18n) {
        this.prisma = prisma;
        this.i18n = i18n;
    }
    transform(invoice) {
        if (!invoice)
            return null;
        return {
            ...invoice,
            total: Number(invoice.total),
            items: invoice.items?.map((item) => ({
                ...item,
                price: Number(item.price),
                total: Number(item.total),
            })) || [],
        };
    }
    async create(data) {
        const { items, ...invoiceData } = data;
        const date = invoiceData.invoiceDate ? new Date(invoiceData.invoiceDate) : new Date();
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const todayPrefix = `${yyyy}${mm}${dd}`;
        if (invoiceData.invoiceDate) {
            invoiceData.invoiceDate = new Date(invoiceData.invoiceDate);
        }
        const lastInvoice = await this.prisma.invoice.findFirst({
            where: {
                invoiceNumber: {
                    startsWith: todayPrefix
                }
            },
            orderBy: {
                invoiceNumber: 'desc'
            }
        });
        let nextIndex = 1;
        if (lastInvoice) {
            const parts = lastInvoice.invoiceNumber.split('/');
            if (parts.length === 2) {
                nextIndex = parseInt(parts[1], 10) + 1;
            }
        }
        const invoiceNumber = `${todayPrefix}/${String(nextIndex).padStart(4, '0')}`;
        const validItems = items.map((item) => ({
            description: item.description,
            quantity: item.quantity,
            price: item.price,
            total: item.quantity * item.price,
        }));
        const total = validItems.reduce((sum, item) => sum + item.total, 0);
        const result = await this.prisma.invoice.create({
            data: {
                ...invoiceData,
                invoiceNumber,
                total,
                items: { create: validItems },
            },
            include: { items: true },
        });
        return this.transform(result);
    }
    async findAll(params) {
        const { skip, take, cursor, where, orderBy } = params || {};
        const invoices = await this.prisma.invoice.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: { items: true },
        });
        return invoices.map(i => this.transform(i));
    }
    async findOne(id) {
        const invoice = await this.prisma.invoice.findUnique({
            where: { id },
            include: { items: true },
        });
        return this.transform(invoice);
    }
    async update(id, data) {
        if (data.invoiceDate) {
            data.invoiceDate = new Date(data.invoiceDate);
        }
        const { items, ...invoiceData } = data;
        if (items) {
            const validItems = items.map((item) => ({
                description: item.description,
                quantity: item.quantity,
                price: item.price,
                total: item.quantity * item.price,
            }));
            const total = validItems.reduce((sum, item) => sum + item.total, 0);
            const result = await this.prisma.invoice.update({
                where: { id },
                data: {
                    ...invoiceData,
                    total,
                    items: {
                        deleteMany: {},
                        create: validItems,
                    }
                },
                include: { items: true },
            });
            return this.transform(result);
        }
        const result = await this.prisma.invoice.update({
            where: { id },
            data: invoiceData,
            include: { items: true },
        });
        return this.transform(result);
    }
    async remove(id) {
        const invoice = await this.prisma.invoice.findUnique({
            where: { id },
        });
        if (!invoice) {
        }
        if (invoice && invoice.status === 'PAID') {
            throw new common_1.BadRequestException(nestjs_i18n_1.I18nContext.current()?.t('INVOICE_DELETE_PAID_ERROR'));
        }
        const result = await this.prisma.invoice.delete({
            where: { id },
            include: { items: true },
        });
        return this.transform(result);
    }
};
exports.InvoicesService = InvoicesService;
exports.InvoicesService = InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        nestjs_i18n_1.I18nService])
], InvoicesService);
//# sourceMappingURL=invoices.service.js.map