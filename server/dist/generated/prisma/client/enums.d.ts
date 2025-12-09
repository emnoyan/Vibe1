export declare const Role: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
    readonly MOD: "MOD";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const InvoiceStatus: {
    readonly PENDING: "PENDING";
    readonly PAID: "PAID";
    readonly CANCELLED: "CANCELLED";
};
export type InvoiceStatus = (typeof InvoiceStatus)[keyof typeof InvoiceStatus];
