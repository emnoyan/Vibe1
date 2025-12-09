import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from 'generated/prisma/client';
import { CreateInvoiceDto, CreateInvoiceItemDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { I18nService, I18nContext } from 'nestjs-i18n';

@Injectable()
export class InvoicesService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly i18n: I18nService
    ) { }

    private transform(invoice: any) {
        if (!invoice) return null;
        return {
            ...invoice,
            total: Number(invoice.total),
            items: invoice.items?.map((item: any) => ({
                ...item,
                price: Number(item.price),
                total: Number(item.total),
            })) || [],
        };
    }

    async create(data: CreateInvoiceDto) {
        const { items, ...invoiceData } = data;

        // Auto-generate invoice number based on passed date or today
        const date = invoiceData.invoiceDate ? new Date(invoiceData.invoiceDate) : new Date();
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const todayPrefix = `${yyyy}${mm}${dd}`;

        // Ensure invoiceDate is a Date object if provided (Prisma expects DateTime/Date or ISO string)
        if (invoiceData.invoiceDate) {
            // @ts-ignore - Repurposing the property potentially, or just ensuring it's ISO
            invoiceData.invoiceDate = new Date(invoiceData.invoiceDate);
        }

        // Find last invoice of today (or the selected date)
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

        const validItems = items.map((item: any) => ({
            description: item.description,
            quantity: item.quantity,
            price: item.price,
            total: item.quantity * item.price,
        }));
        const total = validItems.reduce((sum: number, item: any) => sum + item.total, 0);

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

    async findAll(params?: {
        skip?: number;
        take?: number;
        cursor?: Prisma.InvoiceWhereUniqueInput;
        where?: Prisma.InvoiceWhereInput;
        orderBy?: Prisma.InvoiceOrderByWithRelationInput;
    }) {
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

    async findOne(id: number) {
        const invoice = await this.prisma.invoice.findUnique({
            where: { id },
            include: { items: true },
        });
        return this.transform(invoice);
    }

    async update(id: number, data: UpdateInvoiceDto) {
        // Ensure invoiceDate is a Date object if provided
        if (data.invoiceDate) {
            // @ts-ignore
            data.invoiceDate = new Date(data.invoiceDate);
        }

        const { items, ...invoiceData } = data;

        if (items) {
            const validItems = items.map((item: any) => ({
                description: item.description,
                quantity: item.quantity,
                price: item.price,
                total: item.quantity * item.price,
            }));
            const total = validItems.reduce((sum: number, item: any) => sum + item.total, 0);

            const result = await this.prisma.invoice.update({
                where: { id },
                data: {
                    ...invoiceData,
                    total,
                    items: {
                        deleteMany: {},
                        create: validItems,
                        // @ts-ignore
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

    async remove(id: number) {
        const invoice = await this.prisma.invoice.findUnique({
            where: { id },
        });

        if (!invoice) {
        }

        if (invoice && invoice.status === 'PAID') {
            throw new BadRequestException(I18nContext.current()?.t('INVOICE_DELETE_PAID_ERROR'));
        }

        const result = await this.prisma.invoice.delete({
            where: { id },
            include: { items: true },
        });
        return this.transform(result);
    }
}
