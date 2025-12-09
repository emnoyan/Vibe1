import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Controller('invoices')
export class InvoicesController {
    constructor(private readonly invoicesService: InvoicesService) { }

    @Post()
    create(@Body() createInvoiceDto: CreateInvoiceDto) {
        return this.invoicesService.create(createInvoiceDto);
    }

    @Get()
    findAll(
        @Query('q') q?: string,
        @Query('status') status?: string,
        @Query('date') date?: string,
        @Query('sortBy') sortBy?: string,
        @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    ) {
        const where: any = {};

        if (status) {
            where.status = status;
        }

        if (date) {
            where.invoiceDate = {
                equals: new Date(date)
            };
        }

        if (q) {
            where.OR = [
                { customerName: { contains: q, mode: 'insensitive' } },
                { customerEmail: { contains: q, mode: 'insensitive' } },
                { invoiceNumber: { contains: q, mode: 'insensitive' } },
                { items: { some: { description: { contains: q, mode: 'insensitive' } } } },
            ];
        }

        const orderBy = sortBy ? { [sortBy]: sortOrder || 'desc' } : { createdAt: 'desc' as const };

        return this.invoicesService.findAll({
            where,
            orderBy,
        });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.invoicesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
        return this.invoicesService.update(+id, updateInvoiceDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        console.log('Delete Invoice Lang:', I18nContext.current()?.lang);
        return this.invoicesService.remove(+id);
    }
}
