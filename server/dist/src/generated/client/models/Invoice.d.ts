import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type InvoiceModel = runtime.Types.Result.DefaultSelection<Prisma.$InvoicePayload>;
export type AggregateInvoice = {
    _count: InvoiceCountAggregateOutputType | null;
    _avg: InvoiceAvgAggregateOutputType | null;
    _sum: InvoiceSumAggregateOutputType | null;
    _min: InvoiceMinAggregateOutputType | null;
    _max: InvoiceMaxAggregateOutputType | null;
};
export type InvoiceAvgAggregateOutputType = {
    id: number | null;
    total: runtime.Decimal | null;
};
export type InvoiceSumAggregateOutputType = {
    id: number | null;
    total: runtime.Decimal | null;
};
export type InvoiceMinAggregateOutputType = {
    id: number | null;
    customerName: string | null;
    customerEmail: string | null;
    status: $Enums.InvoiceStatus | null;
    invoiceDate: Date | null;
    invoiceNumber: string | null;
    total: runtime.Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type InvoiceMaxAggregateOutputType = {
    id: number | null;
    customerName: string | null;
    customerEmail: string | null;
    status: $Enums.InvoiceStatus | null;
    invoiceDate: Date | null;
    invoiceNumber: string | null;
    total: runtime.Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type InvoiceCountAggregateOutputType = {
    id: number;
    customerName: number;
    customerEmail: number;
    status: number;
    invoiceDate: number;
    invoiceNumber: number;
    total: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type InvoiceAvgAggregateInputType = {
    id?: true;
    total?: true;
};
export type InvoiceSumAggregateInputType = {
    id?: true;
    total?: true;
};
export type InvoiceMinAggregateInputType = {
    id?: true;
    customerName?: true;
    customerEmail?: true;
    status?: true;
    invoiceDate?: true;
    invoiceNumber?: true;
    total?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type InvoiceMaxAggregateInputType = {
    id?: true;
    customerName?: true;
    customerEmail?: true;
    status?: true;
    invoiceDate?: true;
    invoiceNumber?: true;
    total?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type InvoiceCountAggregateInputType = {
    id?: true;
    customerName?: true;
    customerEmail?: true;
    status?: true;
    invoiceDate?: true;
    invoiceNumber?: true;
    total?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type InvoiceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithRelationInput | Prisma.InvoiceOrderByWithRelationInput[];
    cursor?: Prisma.InvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | InvoiceCountAggregateInputType;
    _avg?: InvoiceAvgAggregateInputType;
    _sum?: InvoiceSumAggregateInputType;
    _min?: InvoiceMinAggregateInputType;
    _max?: InvoiceMaxAggregateInputType;
};
export type GetInvoiceAggregateType<T extends InvoiceAggregateArgs> = {
    [P in keyof T & keyof AggregateInvoice]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInvoice[P]> : Prisma.GetScalarType<T[P], AggregateInvoice[P]>;
};
export type InvoiceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithAggregationInput | Prisma.InvoiceOrderByWithAggregationInput[];
    by: Prisma.InvoiceScalarFieldEnum[] | Prisma.InvoiceScalarFieldEnum;
    having?: Prisma.InvoiceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InvoiceCountAggregateInputType | true;
    _avg?: InvoiceAvgAggregateInputType;
    _sum?: InvoiceSumAggregateInputType;
    _min?: InvoiceMinAggregateInputType;
    _max?: InvoiceMaxAggregateInputType;
};
export type InvoiceGroupByOutputType = {
    id: number;
    customerName: string;
    customerEmail: string;
    status: $Enums.InvoiceStatus;
    invoiceDate: Date;
    invoiceNumber: string;
    total: runtime.Decimal;
    createdAt: Date;
    updatedAt: Date;
    _count: InvoiceCountAggregateOutputType | null;
    _avg: InvoiceAvgAggregateOutputType | null;
    _sum: InvoiceSumAggregateOutputType | null;
    _min: InvoiceMinAggregateOutputType | null;
    _max: InvoiceMaxAggregateOutputType | null;
};
type GetInvoiceGroupByPayload<T extends InvoiceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InvoiceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InvoiceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InvoiceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InvoiceGroupByOutputType[P]>;
}>>;
export type InvoiceWhereInput = {
    AND?: Prisma.InvoiceWhereInput | Prisma.InvoiceWhereInput[];
    OR?: Prisma.InvoiceWhereInput[];
    NOT?: Prisma.InvoiceWhereInput | Prisma.InvoiceWhereInput[];
    id?: Prisma.IntFilter<"Invoice"> | number;
    customerName?: Prisma.StringFilter<"Invoice"> | string;
    customerEmail?: Prisma.StringFilter<"Invoice"> | string;
    status?: Prisma.EnumInvoiceStatusFilter<"Invoice"> | $Enums.InvoiceStatus;
    invoiceDate?: Prisma.DateTimeFilter<"Invoice"> | Date | string;
    invoiceNumber?: Prisma.StringFilter<"Invoice"> | string;
    total?: Prisma.DecimalFilter<"Invoice"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"Invoice"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Invoice"> | Date | string;
    items?: Prisma.InvoiceItemListRelationFilter;
};
export type InvoiceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    customerName?: Prisma.SortOrder;
    customerEmail?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    invoiceDate?: Prisma.SortOrder;
    invoiceNumber?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    items?: Prisma.InvoiceItemOrderByRelationAggregateInput;
};
export type InvoiceWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    invoiceNumber?: string;
    AND?: Prisma.InvoiceWhereInput | Prisma.InvoiceWhereInput[];
    OR?: Prisma.InvoiceWhereInput[];
    NOT?: Prisma.InvoiceWhereInput | Prisma.InvoiceWhereInput[];
    customerName?: Prisma.StringFilter<"Invoice"> | string;
    customerEmail?: Prisma.StringFilter<"Invoice"> | string;
    status?: Prisma.EnumInvoiceStatusFilter<"Invoice"> | $Enums.InvoiceStatus;
    invoiceDate?: Prisma.DateTimeFilter<"Invoice"> | Date | string;
    total?: Prisma.DecimalFilter<"Invoice"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"Invoice"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Invoice"> | Date | string;
    items?: Prisma.InvoiceItemListRelationFilter;
}, "id" | "invoiceNumber">;
export type InvoiceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    customerName?: Prisma.SortOrder;
    customerEmail?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    invoiceDate?: Prisma.SortOrder;
    invoiceNumber?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.InvoiceCountOrderByAggregateInput;
    _avg?: Prisma.InvoiceAvgOrderByAggregateInput;
    _max?: Prisma.InvoiceMaxOrderByAggregateInput;
    _min?: Prisma.InvoiceMinOrderByAggregateInput;
    _sum?: Prisma.InvoiceSumOrderByAggregateInput;
};
export type InvoiceScalarWhereWithAggregatesInput = {
    AND?: Prisma.InvoiceScalarWhereWithAggregatesInput | Prisma.InvoiceScalarWhereWithAggregatesInput[];
    OR?: Prisma.InvoiceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InvoiceScalarWhereWithAggregatesInput | Prisma.InvoiceScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Invoice"> | number;
    customerName?: Prisma.StringWithAggregatesFilter<"Invoice"> | string;
    customerEmail?: Prisma.StringWithAggregatesFilter<"Invoice"> | string;
    status?: Prisma.EnumInvoiceStatusWithAggregatesFilter<"Invoice"> | $Enums.InvoiceStatus;
    invoiceDate?: Prisma.DateTimeWithAggregatesFilter<"Invoice"> | Date | string;
    invoiceNumber?: Prisma.StringWithAggregatesFilter<"Invoice"> | string;
    total?: Prisma.DecimalWithAggregatesFilter<"Invoice"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Invoice"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Invoice"> | Date | string;
};
export type InvoiceCreateInput = {
    customerName: string;
    customerEmail: string;
    status?: $Enums.InvoiceStatus;
    invoiceDate?: Date | string;
    invoiceNumber: string;
    total: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.InvoiceItemCreateNestedManyWithoutInvoiceInput;
};
export type InvoiceUncheckedCreateInput = {
    id?: number;
    customerName: string;
    customerEmail: string;
    status?: $Enums.InvoiceStatus;
    invoiceDate?: Date | string;
    invoiceNumber: string;
    total: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.InvoiceItemUncheckedCreateNestedManyWithoutInvoiceInput;
};
export type InvoiceUpdateInput = {
    customerName?: Prisma.StringFieldUpdateOperationsInput | string;
    customerEmail?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    invoiceDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    total?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.InvoiceItemUpdateManyWithoutInvoiceNestedInput;
};
export type InvoiceUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    customerName?: Prisma.StringFieldUpdateOperationsInput | string;
    customerEmail?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    invoiceDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    total?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.InvoiceItemUncheckedUpdateManyWithoutInvoiceNestedInput;
};
export type InvoiceCreateManyInput = {
    id?: number;
    customerName: string;
    customerEmail: string;
    status?: $Enums.InvoiceStatus;
    invoiceDate?: Date | string;
    invoiceNumber: string;
    total: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InvoiceUpdateManyMutationInput = {
    customerName?: Prisma.StringFieldUpdateOperationsInput | string;
    customerEmail?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    invoiceDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    total?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    customerName?: Prisma.StringFieldUpdateOperationsInput | string;
    customerEmail?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    invoiceDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    total?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    customerName?: Prisma.SortOrder;
    customerEmail?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    invoiceDate?: Prisma.SortOrder;
    invoiceNumber?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InvoiceAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
};
export type InvoiceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    customerName?: Prisma.SortOrder;
    customerEmail?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    invoiceDate?: Prisma.SortOrder;
    invoiceNumber?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InvoiceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    customerName?: Prisma.SortOrder;
    customerEmail?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    invoiceDate?: Prisma.SortOrder;
    invoiceNumber?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type InvoiceSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
};
export type InvoiceScalarRelationFilter = {
    is?: Prisma.InvoiceWhereInput;
    isNot?: Prisma.InvoiceWhereInput;
};
export type EnumInvoiceStatusFieldUpdateOperationsInput = {
    set?: $Enums.InvoiceStatus;
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type InvoiceCreateNestedOneWithoutItemsInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutItemsInput, Prisma.InvoiceUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutItemsInput;
    connect?: Prisma.InvoiceWhereUniqueInput;
};
export type InvoiceUpdateOneRequiredWithoutItemsNestedInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutItemsInput, Prisma.InvoiceUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutItemsInput;
    upsert?: Prisma.InvoiceUpsertWithoutItemsInput;
    connect?: Prisma.InvoiceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InvoiceUpdateToOneWithWhereWithoutItemsInput, Prisma.InvoiceUpdateWithoutItemsInput>, Prisma.InvoiceUncheckedUpdateWithoutItemsInput>;
};
export type InvoiceCreateWithoutItemsInput = {
    customerName: string;
    customerEmail: string;
    status?: $Enums.InvoiceStatus;
    invoiceDate?: Date | string;
    invoiceNumber: string;
    total: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InvoiceUncheckedCreateWithoutItemsInput = {
    id?: number;
    customerName: string;
    customerEmail: string;
    status?: $Enums.InvoiceStatus;
    invoiceDate?: Date | string;
    invoiceNumber: string;
    total: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type InvoiceCreateOrConnectWithoutItemsInput = {
    where: Prisma.InvoiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.InvoiceCreateWithoutItemsInput, Prisma.InvoiceUncheckedCreateWithoutItemsInput>;
};
export type InvoiceUpsertWithoutItemsInput = {
    update: Prisma.XOR<Prisma.InvoiceUpdateWithoutItemsInput, Prisma.InvoiceUncheckedUpdateWithoutItemsInput>;
    create: Prisma.XOR<Prisma.InvoiceCreateWithoutItemsInput, Prisma.InvoiceUncheckedCreateWithoutItemsInput>;
    where?: Prisma.InvoiceWhereInput;
};
export type InvoiceUpdateToOneWithWhereWithoutItemsInput = {
    where?: Prisma.InvoiceWhereInput;
    data: Prisma.XOR<Prisma.InvoiceUpdateWithoutItemsInput, Prisma.InvoiceUncheckedUpdateWithoutItemsInput>;
};
export type InvoiceUpdateWithoutItemsInput = {
    customerName?: Prisma.StringFieldUpdateOperationsInput | string;
    customerEmail?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    invoiceDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    total?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceUncheckedUpdateWithoutItemsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    customerName?: Prisma.StringFieldUpdateOperationsInput | string;
    customerEmail?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    invoiceDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    total?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceCountOutputType = {
    items: number;
};
export type InvoiceCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    items?: boolean | InvoiceCountOutputTypeCountItemsArgs;
};
export type InvoiceCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceCountOutputTypeSelect<ExtArgs> | null;
};
export type InvoiceCountOutputTypeCountItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvoiceItemWhereInput;
};
export type InvoiceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    customerName?: boolean;
    customerEmail?: boolean;
    status?: boolean;
    invoiceDate?: boolean;
    invoiceNumber?: boolean;
    total?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    items?: boolean | Prisma.Invoice$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.InvoiceCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["invoice"]>;
export type InvoiceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    customerName?: boolean;
    customerEmail?: boolean;
    status?: boolean;
    invoiceDate?: boolean;
    invoiceNumber?: boolean;
    total?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["invoice"]>;
export type InvoiceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    customerName?: boolean;
    customerEmail?: boolean;
    status?: boolean;
    invoiceDate?: boolean;
    invoiceNumber?: boolean;
    total?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["invoice"]>;
export type InvoiceSelectScalar = {
    id?: boolean;
    customerName?: boolean;
    customerEmail?: boolean;
    status?: boolean;
    invoiceDate?: boolean;
    invoiceNumber?: boolean;
    total?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type InvoiceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "customerName" | "customerEmail" | "status" | "invoiceDate" | "invoiceNumber" | "total" | "createdAt" | "updatedAt", ExtArgs["result"]["invoice"]>;
export type InvoiceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    items?: boolean | Prisma.Invoice$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.InvoiceCountOutputTypeDefaultArgs<ExtArgs>;
};
export type InvoiceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type InvoiceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $InvoicePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Invoice";
    objects: {
        items: Prisma.$InvoiceItemPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        customerName: string;
        customerEmail: string;
        status: $Enums.InvoiceStatus;
        invoiceDate: Date;
        invoiceNumber: string;
        total: runtime.Decimal;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["invoice"]>;
    composites: {};
};
export type InvoiceGetPayload<S extends boolean | null | undefined | InvoiceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InvoicePayload, S>;
export type InvoiceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InvoiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InvoiceCountAggregateInputType | true;
};
export interface InvoiceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Invoice'];
        meta: {
            name: 'Invoice';
        };
    };
    findUnique<T extends InvoiceFindUniqueArgs>(args: Prisma.SelectSubset<T, InvoiceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends InvoiceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InvoiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends InvoiceFindFirstArgs>(args?: Prisma.SelectSubset<T, InvoiceFindFirstArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends InvoiceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InvoiceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends InvoiceFindManyArgs>(args?: Prisma.SelectSubset<T, InvoiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends InvoiceCreateArgs>(args: Prisma.SelectSubset<T, InvoiceCreateArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends InvoiceCreateManyArgs>(args?: Prisma.SelectSubset<T, InvoiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends InvoiceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InvoiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends InvoiceDeleteArgs>(args: Prisma.SelectSubset<T, InvoiceDeleteArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends InvoiceUpdateArgs>(args: Prisma.SelectSubset<T, InvoiceUpdateArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends InvoiceDeleteManyArgs>(args?: Prisma.SelectSubset<T, InvoiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends InvoiceUpdateManyArgs>(args: Prisma.SelectSubset<T, InvoiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends InvoiceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InvoiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends InvoiceUpsertArgs>(args: Prisma.SelectSubset<T, InvoiceUpsertArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends InvoiceCountArgs>(args?: Prisma.Subset<T, InvoiceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InvoiceCountAggregateOutputType> : number>;
    aggregate<T extends InvoiceAggregateArgs>(args: Prisma.Subset<T, InvoiceAggregateArgs>): Prisma.PrismaPromise<GetInvoiceAggregateType<T>>;
    groupBy<T extends InvoiceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InvoiceGroupByArgs['orderBy'];
    } : {
        orderBy?: InvoiceGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InvoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: InvoiceFieldRefs;
}
export interface Prisma__InvoiceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    items<T extends Prisma.Invoice$itemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Invoice$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface InvoiceFieldRefs {
    readonly id: Prisma.FieldRef<"Invoice", 'Int'>;
    readonly customerName: Prisma.FieldRef<"Invoice", 'String'>;
    readonly customerEmail: Prisma.FieldRef<"Invoice", 'String'>;
    readonly status: Prisma.FieldRef<"Invoice", 'InvoiceStatus'>;
    readonly invoiceDate: Prisma.FieldRef<"Invoice", 'DateTime'>;
    readonly invoiceNumber: Prisma.FieldRef<"Invoice", 'String'>;
    readonly total: Prisma.FieldRef<"Invoice", 'Decimal'>;
    readonly createdAt: Prisma.FieldRef<"Invoice", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Invoice", 'DateTime'>;
}
export type InvoiceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where: Prisma.InvoiceWhereUniqueInput;
};
export type InvoiceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where: Prisma.InvoiceWhereUniqueInput;
};
export type InvoiceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithRelationInput | Prisma.InvoiceOrderByWithRelationInput[];
    cursor?: Prisma.InvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InvoiceScalarFieldEnum | Prisma.InvoiceScalarFieldEnum[];
};
export type InvoiceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithRelationInput | Prisma.InvoiceOrderByWithRelationInput[];
    cursor?: Prisma.InvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InvoiceScalarFieldEnum | Prisma.InvoiceScalarFieldEnum[];
};
export type InvoiceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithRelationInput | Prisma.InvoiceOrderByWithRelationInput[];
    cursor?: Prisma.InvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InvoiceScalarFieldEnum | Prisma.InvoiceScalarFieldEnum[];
};
export type InvoiceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InvoiceCreateInput, Prisma.InvoiceUncheckedCreateInput>;
};
export type InvoiceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InvoiceCreateManyInput | Prisma.InvoiceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InvoiceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    data: Prisma.InvoiceCreateManyInput | Prisma.InvoiceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InvoiceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InvoiceUpdateInput, Prisma.InvoiceUncheckedUpdateInput>;
    where: Prisma.InvoiceWhereUniqueInput;
};
export type InvoiceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InvoiceUpdateManyMutationInput, Prisma.InvoiceUncheckedUpdateManyInput>;
    where?: Prisma.InvoiceWhereInput;
    limit?: number;
};
export type InvoiceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InvoiceUpdateManyMutationInput, Prisma.InvoiceUncheckedUpdateManyInput>;
    where?: Prisma.InvoiceWhereInput;
    limit?: number;
};
export type InvoiceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where: Prisma.InvoiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.InvoiceCreateInput, Prisma.InvoiceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.InvoiceUpdateInput, Prisma.InvoiceUncheckedUpdateInput>;
};
export type InvoiceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where: Prisma.InvoiceWhereUniqueInput;
};
export type InvoiceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvoiceWhereInput;
    limit?: number;
};
export type Invoice$itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceItemSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceItemOmit<ExtArgs> | null;
    include?: Prisma.InvoiceItemInclude<ExtArgs> | null;
    where?: Prisma.InvoiceItemWhereInput;
    orderBy?: Prisma.InvoiceItemOrderByWithRelationInput | Prisma.InvoiceItemOrderByWithRelationInput[];
    cursor?: Prisma.InvoiceItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InvoiceItemScalarFieldEnum | Prisma.InvoiceItemScalarFieldEnum[];
};
export type InvoiceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
};
export {};
