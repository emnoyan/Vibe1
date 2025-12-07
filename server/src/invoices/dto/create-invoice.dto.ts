import { IsString, IsEmail, IsNotEmpty, IsEnum, IsNumber, IsArray, ValidateNested, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { InvoiceStatus } from 'generated/prisma/client';

export class CreateInvoiceItemDto {
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @Min(1)
    quantity: number;

    @IsNumber()
    @Min(0)
    price: number;
}

export class CreateInvoiceDto {
    @IsString()
    @IsNotEmpty()
    customerName: string;

    @IsEmail()
    @IsNotEmpty()
    customerEmail: string;

    @IsEnum(InvoiceStatus)
    @IsOptional()
    status?: InvoiceStatus;

    @IsOptional()
    @IsString() // Or IsDateString if strict
    invoiceDate?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateInvoiceItemDto)
    items: CreateInvoiceItemDto[];
}
