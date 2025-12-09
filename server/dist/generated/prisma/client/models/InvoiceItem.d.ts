import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type InvoiceItemModel = runtime.Types.Result.DefaultSelection<Prisma.$InvoiceItemPayload>;
export type AggregateInvoiceItem = {
    _count: InvoiceItemCountAggregateOutputType | null;
    _avg: InvoiceItemAvgAggregateOutputType | null;
    _sum: InvoiceItemSumAggregateOutputType | null;
    _min: InvoiceItemMinAggregateOutputType | null;
    _max: InvoiceItemMaxAggregateOutputType | null;
};
export type InvoiceItemAvgAggregateOutputType = {
    id: number | null;
    invoiceId: number | null;
    quantity: number | null;
    price: runtime.Decimal | null;
    total: runtime.Decimal | null;
};
export type InvoiceItemSumAggregateOutputType = {
    id: number | null;
    invoiceId: number | null;
    quantity: number | null;
    price: runtime.Decimal | null;
    total: runtime.Decimal | null;
};
export type InvoiceItemMinAggregateOutputType = {
    id: number | null;
    invoiceId: number | null;
    description: string | null;
    quantity: number | null;
    price: runtime.Decimal | null;
    total: runtime.Decimal | null;
};
export type InvoiceItemMaxAggregateOutputType = {
    id: number | null;
    invoiceId: number | null;
    description: string | null;
    quantity: number | null;
    price: runtime.Decimal | null;
    total: runtime.Decimal | null;
};
export type InvoiceItemCountAggregateOutputType = {
    id: number;
    invoiceId: number;
    description: number;
    quantity: number;
    price: number;
    total: number;
    _all: number;
};
export type InvoiceItemAvgAggregateInputType = {
    id?: true;
    invoiceId?: true;
    quantity?: true;
    price?: true;
    total?: true;
};
export type InvoiceItemSumAggregateInputType = {
    id?: true;
    invoiceId?: true;
    quantity?: true;
    price?: true;
    total?: true;
};
export type InvoiceItemMinAggregateInputType = {
    id?: true;
    invoiceId?: true;
    description?: true;
    quantity?: true;
    price?: true;
    total?: true;
};
export type InvoiceItemMaxAggregateInputType = {
    id?: true;
    invoiceId?: true;
    description?: true;
    quantity?: true;
    price?: true;
    total?: true;
};
export type InvoiceItemCountAggregateInputType = {
    id?: true;
    invoiceId?: true;
    description?: true;
    quantity?: true;
    price?: true;
    total?: true;
    _all?: true;
};
export type InvoiceItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvoiceItemWhereInput;
    orderBy?: Prisma.InvoiceItemOrderByWithRelationInput | Prisma.InvoiceItemOrderByWithRelationInput[];
    cursor?: Prisma.InvoiceItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | InvoiceItemCountAggregateInputType;
    _avg?: InvoiceItemAvgAggregateInputType;
    _sum?: InvoiceItemSumAggregateInputType;
    _min?: InvoiceItemMinAggregateInputType;
    _max?: InvoiceItemMaxAggregateInputType;
};
export type GetInvoiceItemAggregateType<T extends InvoiceItemAggregateArgs> = {
    [P in keyof T & keyof AggregateInvoiceItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInvoiceItem[P]> : Prisma.GetScalarType<T[P], AggregateInvoiceItem[P]>;
};
export type InvoiceItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvoiceItemWhereInput;
    orderBy?: Prisma.InvoiceItemOrderByWithAggregationInput | Prisma.InvoiceItemOrderByWithAggregationInput[];
    by: Prisma.InvoiceItemScalarFieldEnum[] | Prisma.InvoiceItemScalarFieldEnum;
    having?: Prisma.InvoiceItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InvoiceItemCountAggregateInputType | true;
    _avg?: InvoiceItemAvgAggregateInputType;
    _sum?: InvoiceItemSumAggregateInputType;
    _min?: InvoiceItemMinAggregateInputType;
    _max?: InvoiceItemMaxAggregateInputType;
};
export type InvoiceItemGroupByOutputType = {
    id: number;
    invoiceId: number;
    description: string;
    quantity: number;
    price: runtime.Decimal;
    total: runtime.Decimal;
    _count: InvoiceItemCountAggregateOutputType | null;
    _avg: InvoiceItemAvgAggregateOutputType | null;
    _sum: InvoiceItemSumAggregateOutputType | null;
    _min: InvoiceItemMinAggregateOutputType | null;
    _max: InvoiceItemMaxAggregateOutputType | null;
};
type GetInvoiceItemGroupByPayload<T extends InvoiceItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InvoiceItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InvoiceItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InvoiceItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InvoiceItemGroupByOutputType[P]>;
}>>;
export type InvoiceItemWhereInput = {
    AND?: Prisma.InvoiceItemWhereInput | Prisma.InvoiceItemWhereInput[];
    OR?: Prisma.InvoiceItemWhereInput[];
    NOT?: Prisma.InvoiceItemWhereInput | Prisma.InvoiceItemWhereInput[];
    id?: Prisma.IntFilter<"InvoiceItem"> | number;
    invoiceId?: Prisma.IntFilter<"InvoiceItem"> | number;
    description?: Prisma.StringFilter<"InvoiceItem"> | string;
    quantity?: Prisma.IntFilter<"InvoiceItem"> | number;
    price?: Prisma.DecimalFilter<"InvoiceItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    total?: Prisma.DecimalFilter<"InvoiceItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    invoice?: Prisma.XOR<Prisma.InvoiceScalarRelationFilter, Prisma.InvoiceWhereInput>;
};
export type InvoiceItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    invoiceId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
    invoice?: Prisma.InvoiceOrderByWithRelationInput;
};
export type InvoiceItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.InvoiceItemWhereInput | Prisma.InvoiceItemWhereInput[];
    OR?: Prisma.InvoiceItemWhereInput[];
    NOT?: Prisma.InvoiceItemWhereInput | Prisma.InvoiceItemWhereInput[];
    invoiceId?: Prisma.IntFilter<"InvoiceItem"> | number;
    description?: Prisma.StringFilter<"InvoiceItem"> | string;
    quantity?: Prisma.IntFilter<"InvoiceItem"> | number;
    price?: Prisma.DecimalFilter<"InvoiceItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    total?: Prisma.DecimalFilter<"InvoiceItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    invoice?: Prisma.XOR<Prisma.InvoiceScalarRelationFilter, Prisma.InvoiceWhereInput>;
}, "id">;
export type InvoiceItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    invoiceId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
    _count?: Prisma.InvoiceItemCountOrderByAggregateInput;
    _avg?: Prisma.InvoiceItemAvgOrderByAggregateInput;
    _max?: Prisma.InvoiceItemMaxOrderByAggregateInput;
    _min?: Prisma.InvoiceItemMinOrderByAggregateInput;
    _sum?: Prisma.InvoiceItemSumOrderByAggregateInput;
};
export type InvoiceItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.InvoiceItemScalarWhereWithAggregatesInput | Prisma.InvoiceItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.InvoiceItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InvoiceItemScalarWhereWithAggregatesInput | Prisma.InvoiceItemScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"InvoiceItem"> | number;
    invoiceId?: Prisma.IntWithAggregatesFilter<"InvoiceItem"> | number;
    description?: Prisma.StringWithAggregatesFilter<"InvoiceItem"> | string;
    quantity?: Prisma.IntWithAggregatesFilter<"InvoiceItem"> | number;
    price?: Prisma.DecimalWithAggregatesFilter<"InvoiceItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    total?: Prisma.DecimalWithAggregatesFilter<"InvoiceItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type InvoiceItemCreateInput = {
    description: string;
    quantity: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    total: runtime.Decimal | runtime.DecimalJsLike | number | string;
    invoice: Prisma.InvoiceCreateNestedOneWithoutItemsInput;
};
export type InvoiceItemUncheckedCreateInput = {
    id?: number;
    invoiceId: number;
    description: string;
    quantity: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    total: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type InvoiceItemUpdateInput = {
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    total?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    invoice?: Prisma.InvoiceUpdateOneRequiredWithoutItemsNestedInput;
};
export type InvoiceItemUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    invoiceId?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    total?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type InvoiceItemCreateManyInput = {
    id?: number;
    invoiceId: number;
    description: string;
    quantity: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    total: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type InvoiceItemUpdateManyMutationInput = {
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    total?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type InvoiceItemUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    invoiceId?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    total?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type InvoiceItemListRelationFilter = {
    every?: Prisma.InvoiceItemWhereInput;
    some?: Prisma.InvoiceItemWhereInput;
    none?: Prisma.InvoiceItemWhereInput;
};
export type InvoiceItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type InvoiceItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    invoiceId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
};
export type InvoiceItemAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    invoiceId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
};
export type InvoiceItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    invoiceId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
};
export type InvoiceItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    invoiceId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
};
export type InvoiceItemSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    invoiceId?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    total?: Prisma.SortOrder;
};
export type InvoiceItemCreateNestedManyWithoutInvoiceInput = {
    create?: Prisma.XOR<Prisma.InvoiceItemCreateWithoutInvoiceInput, Prisma.InvoiceItemUncheckedCreateWithoutInvoiceInput> | Prisma.InvoiceItemCreateWithoutInvoiceInput[] | Prisma.InvoiceItemUncheckedCreateWithoutInvoiceInput[];
    connectOrCreate?: Prisma.InvoiceItemCreateOrConnectWithoutInvoiceInput | Prisma.InvoiceItemCreateOrConnectWithoutInvoiceInput[];
    createMany?: Prisma.InvoiceItemCreateManyInvoiceInputEnvelope;
    connect?: Prisma.InvoiceItemWhereUniqueInput | Prisma.InvoiceItemWhereUniqueInput[];
};
export type InvoiceItemUncheckedCreateNestedManyWithoutInvoiceInput = {
    create?: Prisma.XOR<Prisma.InvoiceItemCreateWithoutInvoiceInput, Prisma.InvoiceItemUncheckedCreateWithoutInvoiceInput> | Prisma.InvoiceItemCreateWithoutInvoiceInput[] | Prisma.InvoiceItemUncheckedCreateWithoutInvoiceInput[];
    connectOrCreate?: Prisma.InvoiceItemCreateOrConnectWithoutInvoiceInput | Prisma.InvoiceItemCreateOrConnectWithoutInvoiceInput[];
    createMany?: Prisma.InvoiceItemCreateManyInvoiceInputEnvelope;
    connect?: Prisma.InvoiceItemWhereUniqueInput | Prisma.InvoiceItemWhereUniqueInput[];
};
export type InvoiceItemUpdateManyWithoutInvoiceNestedInput = {
    create?: Prisma.XOR<Prisma.InvoiceItemCreateWithoutInvoiceInput, Prisma.InvoiceItemUncheckedCreateWithoutInvoiceInput> | Prisma.InvoiceItemCreateWithoutInvoiceInput[] | Prisma.InvoiceItemUncheckedCreateWithoutInvoiceInput[];
    connectOrCreate?: Prisma.InvoiceItemCreateOrConnectWithoutInvoiceInput | Prisma.InvoiceItemCreateOrConnectWithoutInvoiceInput[];
    upsert?: Prisma.InvoiceItemUpsertWithWhereUniqueWithoutInvoiceInput | Prisma.InvoiceItemUpsertWithWhereUniqueWithoutInvoiceInput[];
    createMany?: Prisma.InvoiceItemCreateManyInvoiceInputEnvelope;
    set?: Prisma.InvoiceItemWhereUniqueInput | Prisma.InvoiceItemWhereUniqueInput[];
    disconnect?: Prisma.InvoiceItemWhereUniqueInput | Prisma.InvoiceItemWhereUniqueInput[];
    delete?: Prisma.InvoiceItemWhereUniqueInput | Prisma.InvoiceItemWhereUniqueInput[];
    connect?: Prisma.InvoiceItemWhereUniqueInput | Prisma.InvoiceItemWhereUniqueInput[];
    update?: Prisma.InvoiceItemUpdateWithWhereUniqueWithoutInvoiceInput | Prisma.InvoiceItemUpdateWithWhereUniqueWithoutInvoiceInput[];
    updateMany?: Prisma.InvoiceItemUpdateManyWithWhereWithoutInvoiceInput | Prisma.InvoiceItemUpdateManyWithWhereWithoutInvoiceInput[];
    deleteMany?: Prisma.InvoiceItemScalarWhereInput | Prisma.InvoiceItemScalarWhereInput[];
};
export type InvoiceItemUncheckedUpdateManyWithoutInvoiceNestedInput = {
    create?: Prisma.XOR<Prisma.InvoiceItemCreateWithoutInvoiceInput, Prisma.InvoiceItemUncheckedCreateWithoutInvoiceInput> | Prisma.InvoiceItemCreateWithoutInvoiceInput[] | Prisma.InvoiceItemUncheckedCreateWithoutInvoiceInput[];
    connectOrCreate?: Prisma.InvoiceItemCreateOrConnectWithoutInvoiceInput | Prisma.InvoiceItemCreateOrConnectWithoutInvoiceInput[];
    upsert?: Prisma.InvoiceItemUpsertWithWhereUniqueWithoutInvoiceInput | Prisma.InvoiceItemUpsertWithWhereUniqueWithoutInvoiceInput[];
    createMany?: Prisma.InvoiceItemCreateManyInvoiceInputEnvelope;
    set?: Prisma.InvoiceItemWhereUniqueInput | Prisma.InvoiceItemWhereUniqueInput[];
    disconnect?: Prisma.InvoiceItemWhereUniqueInput | Prisma.InvoiceItemWhereUniqueInput[];
    delete?: Prisma.InvoiceItemWhereUniqueInput | Prisma.InvoiceItemWhereUniqueInput[];
    connect?: Prisma.InvoiceItemWhereUniqueInput | Prisma.InvoiceItemWhereUniqueInput[];
    update?: Prisma.InvoiceItemUpdateWithWhereUniqueWithoutInvoiceInput | Prisma.InvoiceItemUpdateWithWhereUniqueWithoutInvoiceInput[];
    updateMany?: Prisma.InvoiceItemUpdateManyWithWhereWithoutInvoiceInput | Prisma.InvoiceItemUpdateManyWithWhereWithoutInvoiceInput[];
    deleteMany?: Prisma.InvoiceItemScalarWhereInput | Prisma.InvoiceItemScalarWhereInput[];
};
export type InvoiceItemCreateWithoutInvoiceInput = {
    description: string;
    quantity: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    total: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type InvoiceItemUncheckedCreateWithoutInvoiceInput = {
    id?: number;
    description: string;
    quantity: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    total: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type InvoiceItemCreateOrConnectWithoutInvoiceInput = {
    where: Prisma.InvoiceItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.InvoiceItemCreateWithoutInvoiceInput, Prisma.InvoiceItemUncheckedCreateWithoutInvoiceInput>;
};
export type InvoiceItemCreateManyInvoiceInputEnvelope = {
    data: Prisma.InvoiceItemCreateManyInvoiceInput | Prisma.InvoiceItemCreateManyInvoiceInput[];
    skipDuplicates?: boolean;
};
export type InvoiceItemUpsertWithWhereUniqueWithoutInvoiceInput = {
    where: Prisma.InvoiceItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.InvoiceItemUpdateWithoutInvoiceInput, Prisma.InvoiceItemUncheckedUpdateWithoutInvoiceInput>;
    create: Prisma.XOR<Prisma.InvoiceItemCreateWithoutInvoiceInput, Prisma.InvoiceItemUncheckedCreateWithoutInvoiceInput>;
};
export type InvoiceItemUpdateWithWhereUniqueWithoutInvoiceInput = {
    where: Prisma.InvoiceItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.InvoiceItemUpdateWithoutInvoiceInput, Prisma.InvoiceItemUncheckedUpdateWithoutInvoiceInput>;
};
export type InvoiceItemUpdateManyWithWhereWithoutInvoiceInput = {
    where: Prisma.InvoiceItemScalarWhereInput;
    data: Prisma.XOR<Prisma.InvoiceItemUpdateManyMutationInput, Prisma.InvoiceItemUncheckedUpdateManyWithoutInvoiceInput>;
};
export type InvoiceItemScalarWhereInput = {
    AND?: Prisma.InvoiceItemScalarWhereInput | Prisma.InvoiceItemScalarWhereInput[];
    OR?: Prisma.InvoiceItemScalarWhereInput[];
    NOT?: Prisma.InvoiceItemScalarWhereInput | Prisma.InvoiceItemScalarWhereInput[];
    id?: Prisma.IntFilter<"InvoiceItem"> | number;
    invoiceId?: Prisma.IntFilter<"InvoiceItem"> | number;
    description?: Prisma.StringFilter<"InvoiceItem"> | string;
    quantity?: Prisma.IntFilter<"InvoiceItem"> | number;
    price?: Prisma.DecimalFilter<"InvoiceItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    total?: Prisma.DecimalFilter<"InvoiceItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type InvoiceItemCreateManyInvoiceInput = {
    id?: number;
    description: string;
    quantity: number;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    total: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type InvoiceItemUpdateWithoutInvoiceInput = {
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    total?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type InvoiceItemUncheckedUpdateWithoutInvoiceInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    total?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type InvoiceItemUncheckedUpdateManyWithoutInvoiceInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    total?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type InvoiceItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    invoiceId?: boolean;
    description?: boolean;
    quantity?: boolean;
    price?: boolean;
    total?: boolean;
    invoice?: boolean | Prisma.InvoiceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["invoiceItem"]>;
export type InvoiceItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    invoiceId?: boolean;
    description?: boolean;
    quantity?: boolean;
    price?: boolean;
    total?: boolean;
    invoice?: boolean | Prisma.InvoiceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["invoiceItem"]>;
export type InvoiceItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    invoiceId?: boolean;
    description?: boolean;
    quantity?: boolean;
    price?: boolean;
    total?: boolean;
    invoice?: boolean | Prisma.InvoiceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["invoiceItem"]>;
export type InvoiceItemSelectScalar = {
    id?: boolean;
    invoiceId?: boolean;
    description?: boolean;
    quantity?: boolean;
    price?: boolean;
    total?: boolean;
};
export type InvoiceItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "invoiceId" | "description" | "quantity" | "price" | "total", ExtArgs["result"]["invoiceItem"]>;
export type InvoiceItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    invoice?: boolean | Prisma.InvoiceDefaultArgs<ExtArgs>;
};
export type InvoiceItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    invoice?: boolean | Prisma.InvoiceDefaultArgs<ExtArgs>;
};
export type InvoiceItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    invoice?: boolean | Prisma.InvoiceDefaultArgs<ExtArgs>;
};
export type $InvoiceItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "InvoiceItem";
    objects: {
        invoice: Prisma.$InvoicePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        invoiceId: number;
        description: string;
        quantity: number;
        price: runtime.Decimal;
        total: runtime.Decimal;
    }, ExtArgs["result"]["invoiceItem"]>;
    composites: {};
};
export type InvoiceItemGetPayload<S extends boolean | null | undefined | InvoiceItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InvoiceItemPayload, S>;
export type InvoiceItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InvoiceItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InvoiceItemCountAggregateInputType | true;
};
export interface InvoiceItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['InvoiceItem'];
        meta: {
            name: 'InvoiceItem';
        };
    };
    findUnique<T extends InvoiceItemFindUniqueArgs>(args: Prisma.SelectSubset<T, InvoiceItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InvoiceItemClient<runtime.Types.Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends InvoiceItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InvoiceItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InvoiceItemClient<runtime.Types.Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends InvoiceItemFindFirstArgs>(args?: Prisma.SelectSubset<T, InvoiceItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__InvoiceItemClient<runtime.Types.Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends InvoiceItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InvoiceItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InvoiceItemClient<runtime.Types.Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends InvoiceItemFindManyArgs>(args?: Prisma.SelectSubset<T, InvoiceItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends InvoiceItemCreateArgs>(args: Prisma.SelectSubset<T, InvoiceItemCreateArgs<ExtArgs>>): Prisma.Prisma__InvoiceItemClient<runtime.Types.Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends InvoiceItemCreateManyArgs>(args?: Prisma.SelectSubset<T, InvoiceItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends InvoiceItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InvoiceItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends InvoiceItemDeleteArgs>(args: Prisma.SelectSubset<T, InvoiceItemDeleteArgs<ExtArgs>>): Prisma.Prisma__InvoiceItemClient<runtime.Types.Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends InvoiceItemUpdateArgs>(args: Prisma.SelectSubset<T, InvoiceItemUpdateArgs<ExtArgs>>): Prisma.Prisma__InvoiceItemClient<runtime.Types.Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends InvoiceItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, InvoiceItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends InvoiceItemUpdateManyArgs>(args: Prisma.SelectSubset<T, InvoiceItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends InvoiceItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InvoiceItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends InvoiceItemUpsertArgs>(args: Prisma.SelectSubset<T, InvoiceItemUpsertArgs<ExtArgs>>): Prisma.Prisma__InvoiceItemClient<runtime.Types.Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends InvoiceItemCountArgs>(args?: Prisma.Subset<T, InvoiceItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InvoiceItemCountAggregateOutputType> : number>;
    aggregate<T extends InvoiceItemAggregateArgs>(args: Prisma.Subset<T, InvoiceItemAggregateArgs>): Prisma.PrismaPromise<GetInvoiceItemAggregateType<T>>;
    groupBy<T extends InvoiceItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InvoiceItemGroupByArgs['orderBy'];
    } : {
        orderBy?: InvoiceItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InvoiceItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: InvoiceItemFieldRefs;
}
export interface Prisma__InvoiceItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    invoice<T extends Prisma.InvoiceDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InvoiceDefaultArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface InvoiceItemFieldRefs {
    readonly id: Prisma.FieldRef<"InvoiceItem", 'Int'>;
    readonly invoiceId: Prisma.FieldRef<"InvoiceItem", 'Int'>;
    readonly description: Prisma.FieldRef<"InvoiceItem", 'String'>;
    readonly quantity: Prisma.FieldRef<"InvoiceItem", 'Int'>;
    readonly price: Prisma.FieldRef<"InvoiceItem", 'Decimal'>;
    readonly total: Prisma.FieldRef<"InvoiceItem", 'Decimal'>;
}
export type InvoiceItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceItemSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceItemOmit<ExtArgs> | null;
    include?: Prisma.InvoiceItemInclude<ExtArgs> | null;
    where: Prisma.InvoiceItemWhereUniqueInput;
};
export type InvoiceItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceItemSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceItemOmit<ExtArgs> | null;
    include?: Prisma.InvoiceItemInclude<ExtArgs> | null;
    where: Prisma.InvoiceItemWhereUniqueInput;
};
export type InvoiceItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InvoiceItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InvoiceItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InvoiceItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceItemSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceItemOmit<ExtArgs> | null;
    include?: Prisma.InvoiceItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InvoiceItemCreateInput, Prisma.InvoiceItemUncheckedCreateInput>;
};
export type InvoiceItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InvoiceItemCreateManyInput | Prisma.InvoiceItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InvoiceItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InvoiceItemOmit<ExtArgs> | null;
    data: Prisma.InvoiceItemCreateManyInput | Prisma.InvoiceItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.InvoiceItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type InvoiceItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceItemSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceItemOmit<ExtArgs> | null;
    include?: Prisma.InvoiceItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InvoiceItemUpdateInput, Prisma.InvoiceItemUncheckedUpdateInput>;
    where: Prisma.InvoiceItemWhereUniqueInput;
};
export type InvoiceItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InvoiceItemUpdateManyMutationInput, Prisma.InvoiceItemUncheckedUpdateManyInput>;
    where?: Prisma.InvoiceItemWhereInput;
    limit?: number;
};
export type InvoiceItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InvoiceItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InvoiceItemUpdateManyMutationInput, Prisma.InvoiceItemUncheckedUpdateManyInput>;
    where?: Prisma.InvoiceItemWhereInput;
    limit?: number;
    include?: Prisma.InvoiceItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type InvoiceItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceItemSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceItemOmit<ExtArgs> | null;
    include?: Prisma.InvoiceItemInclude<ExtArgs> | null;
    where: Prisma.InvoiceItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.InvoiceItemCreateInput, Prisma.InvoiceItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.InvoiceItemUpdateInput, Prisma.InvoiceItemUncheckedUpdateInput>;
};
export type InvoiceItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceItemSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceItemOmit<ExtArgs> | null;
    include?: Prisma.InvoiceItemInclude<ExtArgs> | null;
    where: Prisma.InvoiceItemWhereUniqueInput;
};
export type InvoiceItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvoiceItemWhereInput;
    limit?: number;
};
export type InvoiceItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceItemSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceItemOmit<ExtArgs> | null;
    include?: Prisma.InvoiceItemInclude<ExtArgs> | null;
};
export {};
