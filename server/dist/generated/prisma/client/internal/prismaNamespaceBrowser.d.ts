import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Post: "Post";
    readonly Category: "Category";
    readonly Invoice: "Invoice";
    readonly InvoiceItem: "InvoiceItem";
    readonly Translation: "Translation";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly password: "password";
    readonly name: "name";
    readonly role: "role";
    readonly status: "status";
    readonly searchText: "searchText";
    readonly hashedRefreshToken: "hashedRefreshToken";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const PostScalarFieldEnum: {
    readonly id: "id";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly published: "published";
    readonly title: "title";
    readonly content: "content";
    readonly image: "image";
    readonly authorId: "authorId";
    readonly categoryId: "categoryId";
    readonly searchText: "searchText";
};
export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum];
export declare const CategoryScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly slug: "slug";
};
export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];
export declare const InvoiceScalarFieldEnum: {
    readonly id: "id";
    readonly customerName: "customerName";
    readonly customerEmail: "customerEmail";
    readonly status: "status";
    readonly invoiceDate: "invoiceDate";
    readonly invoiceNumber: "invoiceNumber";
    readonly total: "total";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type InvoiceScalarFieldEnum = (typeof InvoiceScalarFieldEnum)[keyof typeof InvoiceScalarFieldEnum];
export declare const InvoiceItemScalarFieldEnum: {
    readonly id: "id";
    readonly invoiceId: "invoiceId";
    readonly description: "description";
    readonly quantity: "quantity";
    readonly price: "price";
    readonly total: "total";
};
export type InvoiceItemScalarFieldEnum = (typeof InvoiceItemScalarFieldEnum)[keyof typeof InvoiceItemScalarFieldEnum];
export declare const TranslationScalarFieldEnum: {
    readonly id: "id";
    readonly key: "key";
    readonly locale: "locale";
    readonly value: "value";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TranslationScalarFieldEnum = (typeof TranslationScalarFieldEnum)[keyof typeof TranslationScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
