import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PostModel = runtime.Types.Result.DefaultSelection<Prisma.$PostPayload>;
export type AggregatePost = {
    _count: PostCountAggregateOutputType | null;
    _avg: PostAvgAggregateOutputType | null;
    _sum: PostSumAggregateOutputType | null;
    _min: PostMinAggregateOutputType | null;
    _max: PostMaxAggregateOutputType | null;
};
export type PostAvgAggregateOutputType = {
    id: number | null;
    authorId: number | null;
    categoryId: number | null;
};
export type PostSumAggregateOutputType = {
    id: number | null;
    authorId: number | null;
    categoryId: number | null;
};
export type PostMinAggregateOutputType = {
    id: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    published: boolean | null;
    title: string | null;
    content: string | null;
    image: string | null;
    authorId: number | null;
    categoryId: number | null;
    searchText: string | null;
};
export type PostMaxAggregateOutputType = {
    id: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    published: boolean | null;
    title: string | null;
    content: string | null;
    image: string | null;
    authorId: number | null;
    categoryId: number | null;
    searchText: string | null;
};
export type PostCountAggregateOutputType = {
    id: number;
    createdAt: number;
    updatedAt: number;
    published: number;
    title: number;
    content: number;
    image: number;
    authorId: number;
    categoryId: number;
    searchText: number;
    _all: number;
};
export type PostAvgAggregateInputType = {
    id?: true;
    authorId?: true;
    categoryId?: true;
};
export type PostSumAggregateInputType = {
    id?: true;
    authorId?: true;
    categoryId?: true;
};
export type PostMinAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    published?: true;
    title?: true;
    content?: true;
    image?: true;
    authorId?: true;
    categoryId?: true;
    searchText?: true;
};
export type PostMaxAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    published?: true;
    title?: true;
    content?: true;
    image?: true;
    authorId?: true;
    categoryId?: true;
    searchText?: true;
};
export type PostCountAggregateInputType = {
    id?: true;
    createdAt?: true;
    updatedAt?: true;
    published?: true;
    title?: true;
    content?: true;
    image?: true;
    authorId?: true;
    categoryId?: true;
    searchText?: true;
    _all?: true;
};
export type PostAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput | Prisma.PostOrderByWithRelationInput[];
    cursor?: Prisma.PostWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PostCountAggregateInputType;
    _avg?: PostAvgAggregateInputType;
    _sum?: PostSumAggregateInputType;
    _min?: PostMinAggregateInputType;
    _max?: PostMaxAggregateInputType;
};
export type GetPostAggregateType<T extends PostAggregateArgs> = {
    [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePost[P]> : Prisma.GetScalarType<T[P], AggregatePost[P]>;
};
export type PostGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithAggregationInput | Prisma.PostOrderByWithAggregationInput[];
    by: Prisma.PostScalarFieldEnum[] | Prisma.PostScalarFieldEnum;
    having?: Prisma.PostScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PostCountAggregateInputType | true;
    _avg?: PostAvgAggregateInputType;
    _sum?: PostSumAggregateInputType;
    _min?: PostMinAggregateInputType;
    _max?: PostMaxAggregateInputType;
};
export type PostGroupByOutputType = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    published: boolean;
    title: string;
    content: string | null;
    image: string | null;
    authorId: number | null;
    categoryId: number | null;
    searchText: string;
    _count: PostCountAggregateOutputType | null;
    _avg: PostAvgAggregateOutputType | null;
    _sum: PostSumAggregateOutputType | null;
    _min: PostMinAggregateOutputType | null;
    _max: PostMaxAggregateOutputType | null;
};
type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PostGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PostGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PostGroupByOutputType[P]>;
}>>;
export type PostWhereInput = {
    AND?: Prisma.PostWhereInput | Prisma.PostWhereInput[];
    OR?: Prisma.PostWhereInput[];
    NOT?: Prisma.PostWhereInput | Prisma.PostWhereInput[];
    id?: Prisma.IntFilter<"Post"> | number;
    createdAt?: Prisma.DateTimeFilter<"Post"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Post"> | Date | string;
    published?: Prisma.BoolFilter<"Post"> | boolean;
    title?: Prisma.StringFilter<"Post"> | string;
    content?: Prisma.StringNullableFilter<"Post"> | string | null;
    image?: Prisma.StringNullableFilter<"Post"> | string | null;
    authorId?: Prisma.IntNullableFilter<"Post"> | number | null;
    categoryId?: Prisma.IntNullableFilter<"Post"> | number | null;
    searchText?: Prisma.StringFilter<"Post"> | string;
    author?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    category?: Prisma.XOR<Prisma.CategoryNullableScalarRelationFilter, Prisma.CategoryWhereInput> | null;
};
export type PostOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    published?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    content?: Prisma.SortOrderInput | Prisma.SortOrder;
    image?: Prisma.SortOrderInput | Prisma.SortOrder;
    authorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    categoryId?: Prisma.SortOrderInput | Prisma.SortOrder;
    searchText?: Prisma.SortOrder;
    author?: Prisma.UserOrderByWithRelationInput;
    category?: Prisma.CategoryOrderByWithRelationInput;
};
export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.PostWhereInput | Prisma.PostWhereInput[];
    OR?: Prisma.PostWhereInput[];
    NOT?: Prisma.PostWhereInput | Prisma.PostWhereInput[];
    createdAt?: Prisma.DateTimeFilter<"Post"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Post"> | Date | string;
    published?: Prisma.BoolFilter<"Post"> | boolean;
    title?: Prisma.StringFilter<"Post"> | string;
    content?: Prisma.StringNullableFilter<"Post"> | string | null;
    image?: Prisma.StringNullableFilter<"Post"> | string | null;
    authorId?: Prisma.IntNullableFilter<"Post"> | number | null;
    categoryId?: Prisma.IntNullableFilter<"Post"> | number | null;
    searchText?: Prisma.StringFilter<"Post"> | string;
    author?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    category?: Prisma.XOR<Prisma.CategoryNullableScalarRelationFilter, Prisma.CategoryWhereInput> | null;
}, "id">;
export type PostOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    published?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    content?: Prisma.SortOrderInput | Prisma.SortOrder;
    image?: Prisma.SortOrderInput | Prisma.SortOrder;
    authorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    categoryId?: Prisma.SortOrderInput | Prisma.SortOrder;
    searchText?: Prisma.SortOrder;
    _count?: Prisma.PostCountOrderByAggregateInput;
    _avg?: Prisma.PostAvgOrderByAggregateInput;
    _max?: Prisma.PostMaxOrderByAggregateInput;
    _min?: Prisma.PostMinOrderByAggregateInput;
    _sum?: Prisma.PostSumOrderByAggregateInput;
};
export type PostScalarWhereWithAggregatesInput = {
    AND?: Prisma.PostScalarWhereWithAggregatesInput | Prisma.PostScalarWhereWithAggregatesInput[];
    OR?: Prisma.PostScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PostScalarWhereWithAggregatesInput | Prisma.PostScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Post"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Post"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Post"> | Date | string;
    published?: Prisma.BoolWithAggregatesFilter<"Post"> | boolean;
    title?: Prisma.StringWithAggregatesFilter<"Post"> | string;
    content?: Prisma.StringNullableWithAggregatesFilter<"Post"> | string | null;
    image?: Prisma.StringNullableWithAggregatesFilter<"Post"> | string | null;
    authorId?: Prisma.IntNullableWithAggregatesFilter<"Post"> | number | null;
    categoryId?: Prisma.IntNullableWithAggregatesFilter<"Post"> | number | null;
    searchText?: Prisma.StringWithAggregatesFilter<"Post"> | string;
};
export type PostCreateInput = {
    createdAt?: Date | string;
    updatedAt?: Date | string;
    published?: boolean;
    title: string;
    content?: string | null;
    image?: string | null;
    searchText?: string;
    author?: Prisma.UserCreateNestedOneWithoutPostsInput;
    category?: Prisma.CategoryCreateNestedOneWithoutPostsInput;
};
export type PostUncheckedCreateInput = {
    id?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    published?: boolean;
    title: string;
    content?: string | null;
    image?: string | null;
    authorId?: number | null;
    categoryId?: number | null;
    searchText?: string;
};
export type PostUpdateInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    published?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    searchText?: Prisma.StringFieldUpdateOperationsInput | string;
    author?: Prisma.UserUpdateOneWithoutPostsNestedInput;
    category?: Prisma.CategoryUpdateOneWithoutPostsNestedInput;
};
export type PostUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    published?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    categoryId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    searchText?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostCreateManyInput = {
    id?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    published?: boolean;
    title: string;
    content?: string | null;
    image?: string | null;
    authorId?: number | null;
    categoryId?: number | null;
    searchText?: string;
};
export type PostUpdateManyMutationInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    published?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    searchText?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    published?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    categoryId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    searchText?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostListRelationFilter = {
    every?: Prisma.PostWhereInput;
    some?: Prisma.PostWhereInput;
    none?: Prisma.PostWhereInput;
};
export type PostOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PostCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    published?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    searchText?: Prisma.SortOrder;
};
export type PostAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
};
export type PostMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    published?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    searchText?: Prisma.SortOrder;
};
export type PostMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    published?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    searchText?: Prisma.SortOrder;
};
export type PostSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
};
export type PostCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutAuthorInput, Prisma.PostUncheckedCreateWithoutAuthorInput> | Prisma.PostCreateWithoutAuthorInput[] | Prisma.PostUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutAuthorInput | Prisma.PostCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.PostCreateManyAuthorInputEnvelope;
    connect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
};
export type PostUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutAuthorInput, Prisma.PostUncheckedCreateWithoutAuthorInput> | Prisma.PostCreateWithoutAuthorInput[] | Prisma.PostUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutAuthorInput | Prisma.PostCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.PostCreateManyAuthorInputEnvelope;
    connect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
};
export type PostUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutAuthorInput, Prisma.PostUncheckedCreateWithoutAuthorInput> | Prisma.PostCreateWithoutAuthorInput[] | Prisma.PostUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutAuthorInput | Prisma.PostCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput | Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.PostCreateManyAuthorInputEnvelope;
    set?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    disconnect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    delete?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    connect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    update?: Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput | Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.PostUpdateManyWithWhereWithoutAuthorInput | Prisma.PostUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.PostScalarWhereInput | Prisma.PostScalarWhereInput[];
};
export type PostUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutAuthorInput, Prisma.PostUncheckedCreateWithoutAuthorInput> | Prisma.PostCreateWithoutAuthorInput[] | Prisma.PostUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutAuthorInput | Prisma.PostCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput | Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.PostCreateManyAuthorInputEnvelope;
    set?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    disconnect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    delete?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    connect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    update?: Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput | Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.PostUpdateManyWithWhereWithoutAuthorInput | Prisma.PostUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.PostScalarWhereInput | Prisma.PostScalarWhereInput[];
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type PostCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutCategoryInput, Prisma.PostUncheckedCreateWithoutCategoryInput> | Prisma.PostCreateWithoutCategoryInput[] | Prisma.PostUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutCategoryInput | Prisma.PostCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.PostCreateManyCategoryInputEnvelope;
    connect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
};
export type PostUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutCategoryInput, Prisma.PostUncheckedCreateWithoutCategoryInput> | Prisma.PostCreateWithoutCategoryInput[] | Prisma.PostUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutCategoryInput | Prisma.PostCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.PostCreateManyCategoryInputEnvelope;
    connect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
};
export type PostUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutCategoryInput, Prisma.PostUncheckedCreateWithoutCategoryInput> | Prisma.PostCreateWithoutCategoryInput[] | Prisma.PostUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutCategoryInput | Prisma.PostCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.PostUpsertWithWhereUniqueWithoutCategoryInput | Prisma.PostUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.PostCreateManyCategoryInputEnvelope;
    set?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    disconnect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    delete?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    connect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    update?: Prisma.PostUpdateWithWhereUniqueWithoutCategoryInput | Prisma.PostUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.PostUpdateManyWithWhereWithoutCategoryInput | Prisma.PostUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.PostScalarWhereInput | Prisma.PostScalarWhereInput[];
};
export type PostUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutCategoryInput, Prisma.PostUncheckedCreateWithoutCategoryInput> | Prisma.PostCreateWithoutCategoryInput[] | Prisma.PostUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutCategoryInput | Prisma.PostCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.PostUpsertWithWhereUniqueWithoutCategoryInput | Prisma.PostUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.PostCreateManyCategoryInputEnvelope;
    set?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    disconnect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    delete?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    connect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    update?: Prisma.PostUpdateWithWhereUniqueWithoutCategoryInput | Prisma.PostUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.PostUpdateManyWithWhereWithoutCategoryInput | Prisma.PostUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.PostScalarWhereInput | Prisma.PostScalarWhereInput[];
};
export type PostCreateWithoutAuthorInput = {
    createdAt?: Date | string;
    updatedAt?: Date | string;
    published?: boolean;
    title: string;
    content?: string | null;
    image?: string | null;
    searchText?: string;
    category?: Prisma.CategoryCreateNestedOneWithoutPostsInput;
};
export type PostUncheckedCreateWithoutAuthorInput = {
    id?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    published?: boolean;
    title: string;
    content?: string | null;
    image?: string | null;
    categoryId?: number | null;
    searchText?: string;
};
export type PostCreateOrConnectWithoutAuthorInput = {
    where: Prisma.PostWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostCreateWithoutAuthorInput, Prisma.PostUncheckedCreateWithoutAuthorInput>;
};
export type PostCreateManyAuthorInputEnvelope = {
    data: Prisma.PostCreateManyAuthorInput | Prisma.PostCreateManyAuthorInput[];
    skipDuplicates?: boolean;
};
export type PostUpsertWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.PostWhereUniqueInput;
    update: Prisma.XOR<Prisma.PostUpdateWithoutAuthorInput, Prisma.PostUncheckedUpdateWithoutAuthorInput>;
    create: Prisma.XOR<Prisma.PostCreateWithoutAuthorInput, Prisma.PostUncheckedCreateWithoutAuthorInput>;
};
export type PostUpdateWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.XOR<Prisma.PostUpdateWithoutAuthorInput, Prisma.PostUncheckedUpdateWithoutAuthorInput>;
};
export type PostUpdateManyWithWhereWithoutAuthorInput = {
    where: Prisma.PostScalarWhereInput;
    data: Prisma.XOR<Prisma.PostUpdateManyMutationInput, Prisma.PostUncheckedUpdateManyWithoutAuthorInput>;
};
export type PostScalarWhereInput = {
    AND?: Prisma.PostScalarWhereInput | Prisma.PostScalarWhereInput[];
    OR?: Prisma.PostScalarWhereInput[];
    NOT?: Prisma.PostScalarWhereInput | Prisma.PostScalarWhereInput[];
    id?: Prisma.IntFilter<"Post"> | number;
    createdAt?: Prisma.DateTimeFilter<"Post"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Post"> | Date | string;
    published?: Prisma.BoolFilter<"Post"> | boolean;
    title?: Prisma.StringFilter<"Post"> | string;
    content?: Prisma.StringNullableFilter<"Post"> | string | null;
    image?: Prisma.StringNullableFilter<"Post"> | string | null;
    authorId?: Prisma.IntNullableFilter<"Post"> | number | null;
    categoryId?: Prisma.IntNullableFilter<"Post"> | number | null;
    searchText?: Prisma.StringFilter<"Post"> | string;
};
export type PostCreateWithoutCategoryInput = {
    createdAt?: Date | string;
    updatedAt?: Date | string;
    published?: boolean;
    title: string;
    content?: string | null;
    image?: string | null;
    searchText?: string;
    author?: Prisma.UserCreateNestedOneWithoutPostsInput;
};
export type PostUncheckedCreateWithoutCategoryInput = {
    id?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    published?: boolean;
    title: string;
    content?: string | null;
    image?: string | null;
    authorId?: number | null;
    searchText?: string;
};
export type PostCreateOrConnectWithoutCategoryInput = {
    where: Prisma.PostWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostCreateWithoutCategoryInput, Prisma.PostUncheckedCreateWithoutCategoryInput>;
};
export type PostCreateManyCategoryInputEnvelope = {
    data: Prisma.PostCreateManyCategoryInput | Prisma.PostCreateManyCategoryInput[];
    skipDuplicates?: boolean;
};
export type PostUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.PostWhereUniqueInput;
    update: Prisma.XOR<Prisma.PostUpdateWithoutCategoryInput, Prisma.PostUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.PostCreateWithoutCategoryInput, Prisma.PostUncheckedCreateWithoutCategoryInput>;
};
export type PostUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.XOR<Prisma.PostUpdateWithoutCategoryInput, Prisma.PostUncheckedUpdateWithoutCategoryInput>;
};
export type PostUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.PostScalarWhereInput;
    data: Prisma.XOR<Prisma.PostUpdateManyMutationInput, Prisma.PostUncheckedUpdateManyWithoutCategoryInput>;
};
export type PostCreateManyAuthorInput = {
    id?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    published?: boolean;
    title: string;
    content?: string | null;
    image?: string | null;
    categoryId?: number | null;
    searchText?: string;
};
export type PostUpdateWithoutAuthorInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    published?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    searchText?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.CategoryUpdateOneWithoutPostsNestedInput;
};
export type PostUncheckedUpdateWithoutAuthorInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    published?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    searchText?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostUncheckedUpdateManyWithoutAuthorInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    published?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    searchText?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostCreateManyCategoryInput = {
    id?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    published?: boolean;
    title: string;
    content?: string | null;
    image?: string | null;
    authorId?: number | null;
    searchText?: string;
};
export type PostUpdateWithoutCategoryInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    published?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    searchText?: Prisma.StringFieldUpdateOperationsInput | string;
    author?: Prisma.UserUpdateOneWithoutPostsNestedInput;
};
export type PostUncheckedUpdateWithoutCategoryInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    published?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    searchText?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostUncheckedUpdateManyWithoutCategoryInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    published?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    image?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    searchText?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PostSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    published?: boolean;
    title?: boolean;
    content?: boolean;
    image?: boolean;
    authorId?: boolean;
    categoryId?: boolean;
    searchText?: boolean;
    author?: boolean | Prisma.Post$authorArgs<ExtArgs>;
    category?: boolean | Prisma.Post$categoryArgs<ExtArgs>;
}, ExtArgs["result"]["post"]>;
export type PostSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    published?: boolean;
    title?: boolean;
    content?: boolean;
    image?: boolean;
    authorId?: boolean;
    categoryId?: boolean;
    searchText?: boolean;
    author?: boolean | Prisma.Post$authorArgs<ExtArgs>;
    category?: boolean | Prisma.Post$categoryArgs<ExtArgs>;
}, ExtArgs["result"]["post"]>;
export type PostSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    published?: boolean;
    title?: boolean;
    content?: boolean;
    image?: boolean;
    authorId?: boolean;
    categoryId?: boolean;
    searchText?: boolean;
    author?: boolean | Prisma.Post$authorArgs<ExtArgs>;
    category?: boolean | Prisma.Post$categoryArgs<ExtArgs>;
}, ExtArgs["result"]["post"]>;
export type PostSelectScalar = {
    id?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    published?: boolean;
    title?: boolean;
    content?: boolean;
    image?: boolean;
    authorId?: boolean;
    categoryId?: boolean;
    searchText?: boolean;
};
export type PostOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "published" | "title" | "content" | "image" | "authorId" | "categoryId" | "searchText", ExtArgs["result"]["post"]>;
export type PostInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.Post$authorArgs<ExtArgs>;
    category?: boolean | Prisma.Post$categoryArgs<ExtArgs>;
};
export type PostIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.Post$authorArgs<ExtArgs>;
    category?: boolean | Prisma.Post$categoryArgs<ExtArgs>;
};
export type PostIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.Post$authorArgs<ExtArgs>;
    category?: boolean | Prisma.Post$categoryArgs<ExtArgs>;
};
export type $PostPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Post";
    objects: {
        author: Prisma.$UserPayload<ExtArgs> | null;
        category: Prisma.$CategoryPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        published: boolean;
        title: string;
        content: string | null;
        image: string | null;
        authorId: number | null;
        categoryId: number | null;
        searchText: string;
    }, ExtArgs["result"]["post"]>;
    composites: {};
};
export type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PostPayload, S>;
export type PostCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PostCountAggregateInputType | true;
};
export interface PostDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Post'];
        meta: {
            name: 'Post';
        };
    };
    findUnique<T extends PostFindUniqueArgs>(args: Prisma.SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PostFindFirstArgs>(args?: Prisma.SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PostFindManyArgs>(args?: Prisma.SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PostCreateArgs>(args: Prisma.SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PostCreateManyArgs>(args?: Prisma.SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PostCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PostDeleteArgs>(args: Prisma.SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PostUpdateArgs>(args: Prisma.SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PostDeleteManyArgs>(args?: Prisma.SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PostUpdateManyArgs>(args: Prisma.SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PostUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PostUpsertArgs>(args: Prisma.SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PostCountArgs>(args?: Prisma.Subset<T, PostCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PostCountAggregateOutputType> : number>;
    aggregate<T extends PostAggregateArgs>(args: Prisma.Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>;
    groupBy<T extends PostGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PostGroupByArgs['orderBy'];
    } : {
        orderBy?: PostGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PostFieldRefs;
}
export interface Prisma__PostClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    author<T extends Prisma.Post$authorArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Post$authorArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    category<T extends Prisma.Post$categoryArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Post$categoryArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PostFieldRefs {
    readonly id: Prisma.FieldRef<"Post", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Post", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Post", 'DateTime'>;
    readonly published: Prisma.FieldRef<"Post", 'Boolean'>;
    readonly title: Prisma.FieldRef<"Post", 'String'>;
    readonly content: Prisma.FieldRef<"Post", 'String'>;
    readonly image: Prisma.FieldRef<"Post", 'String'>;
    readonly authorId: Prisma.FieldRef<"Post", 'Int'>;
    readonly categoryId: Prisma.FieldRef<"Post", 'Int'>;
    readonly searchText: Prisma.FieldRef<"Post", 'String'>;
}
export type PostFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    where: Prisma.PostWhereUniqueInput;
};
export type PostFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    where: Prisma.PostWhereUniqueInput;
};
export type PostFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput | Prisma.PostOrderByWithRelationInput[];
    cursor?: Prisma.PostWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostScalarFieldEnum | Prisma.PostScalarFieldEnum[];
};
export type PostFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput | Prisma.PostOrderByWithRelationInput[];
    cursor?: Prisma.PostWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostScalarFieldEnum | Prisma.PostScalarFieldEnum[];
};
export type PostFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput | Prisma.PostOrderByWithRelationInput[];
    cursor?: Prisma.PostWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostScalarFieldEnum | Prisma.PostScalarFieldEnum[];
};
export type PostCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostCreateInput, Prisma.PostUncheckedCreateInput>;
};
export type PostCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PostCreateManyInput | Prisma.PostCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PostCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    data: Prisma.PostCreateManyInput | Prisma.PostCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PostIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PostUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostUpdateInput, Prisma.PostUncheckedUpdateInput>;
    where: Prisma.PostWhereUniqueInput;
};
export type PostUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PostUpdateManyMutationInput, Prisma.PostUncheckedUpdateManyInput>;
    where?: Prisma.PostWhereInput;
    limit?: number;
};
export type PostUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostUpdateManyMutationInput, Prisma.PostUncheckedUpdateManyInput>;
    where?: Prisma.PostWhereInput;
    limit?: number;
    include?: Prisma.PostIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PostUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    where: Prisma.PostWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostCreateInput, Prisma.PostUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PostUpdateInput, Prisma.PostUncheckedUpdateInput>;
};
export type PostDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    where: Prisma.PostWhereUniqueInput;
};
export type PostDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostWhereInput;
    limit?: number;
};
export type Post$authorArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type Post$categoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where?: Prisma.CategoryWhereInput;
};
export type PostDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
};
export {};
