import { InvoiceStatus } from 'generated/prisma/client';
export declare class CreateInvoiceItemDto {
    description: string;
    quantity: number;
    price: number;
}
export declare class CreateInvoiceDto {
    customerName: string;
    customerEmail: string;
    status?: InvoiceStatus;
    invoiceDate?: string;
    items: CreateInvoiceItemDto[];
}
