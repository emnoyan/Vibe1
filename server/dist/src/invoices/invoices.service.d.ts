import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from 'generated/prisma/client';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { I18nService } from 'nestjs-i18n';
export declare class InvoicesService {
    private readonly prisma;
    private readonly i18n;
    constructor(prisma: PrismaService, i18n: I18nService);
    private transform;
    create(data: CreateInvoiceDto): Promise<any>;
    findAll(params?: {
        skip?: number;
        take?: number;
        cursor?: Prisma.InvoiceWhereUniqueInput;
        where?: Prisma.InvoiceWhereInput;
        orderBy?: Prisma.InvoiceOrderByWithRelationInput;
    }): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, data: UpdateInvoiceDto): Promise<any>;
    remove(id: number): Promise<any>;
}
