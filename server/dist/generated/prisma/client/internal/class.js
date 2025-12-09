"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.1.0",
    "engineVersion": "ab635e6b9d606fa5c8fb8b1a7f909c3c3c1c98ba",
    "activeProvider": "postgresql",
    "inlineSchema": "datasource db {\n  provider = \"postgresql\"\n}\n\ngenerator client {\n  provider     = \"prisma-client\"\n  output       = \"../generated/prisma/client\"\n  moduleFormat = \"cjs\"\n}\n\nmodel User {\n  id                 Int        @id @default(autoincrement())\n  email              String     @unique\n  password           String\n  name               String?\n  role               Role       @default(USER)\n  status             UserStatus @default(ACTIVE)\n  searchText         String     @default(\"\")\n  hashedRefreshToken String?\n  posts              Post[]\n  managedCategories  Category[] @relation(\"CategoryModerator\")\n  createdAt          DateTime   @default(now())\n  updatedAt          DateTime   @updatedAt\n}\n\nmodel Post {\n  id         Int       @id @default(autoincrement())\n  createdAt  DateTime  @default(now())\n  updatedAt  DateTime  @updatedAt\n  published  Boolean   @default(false)\n  title      String    @db.VarChar(255)\n  content    String?\n  image      String?\n  author     User?     @relation(fields: [authorId], references: [id])\n  authorId   Int?\n  category   Category? @relation(fields: [categoryId], references: [id])\n  categoryId Int?\n  searchText String    @default(\"\")\n}\n\nmodel Category {\n  id         Int    @id @default(autoincrement())\n  name       String @unique\n  slug       String @unique\n  posts      Post[]\n  moderators User[] @relation(\"CategoryModerator\")\n}\n\nenum Role {\n  USER\n  ADMIN\n  MOD\n}\n\nenum UserStatus {\n  ACTIVE\n  INACTIVE\n}\n\nmodel Invoice {\n  id            Int           @id @default(autoincrement())\n  customerName  String\n  customerEmail String\n  status        InvoiceStatus @default(PENDING)\n  invoiceDate   DateTime      @default(now())\n  invoiceNumber String        @unique\n  total         Decimal       @db.Decimal(10, 2)\n  items         InvoiceItem[]\n  createdAt     DateTime      @default(now())\n  updatedAt     DateTime      @updatedAt\n}\n\nmodel InvoiceItem {\n  id          Int     @id @default(autoincrement())\n  invoice     Invoice @relation(fields: [invoiceId], references: [id], onDelete: Cascade)\n  invoiceId   Int\n  description String\n  quantity    Int\n  price       Decimal @db.Decimal(10, 2)\n  total       Decimal @db.Decimal(10, 2)\n}\n\nenum InvoiceStatus {\n  PENDING\n  PAID\n  CANCELLED\n}\n\nmodel Translation {\n  id        String   @id @default(uuid())\n  key       String\n  locale    String\n  value     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([key, locale])\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"Role\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"UserStatus\"},{\"name\":\"searchText\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"hashedRefreshToken\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"posts\",\"kind\":\"object\",\"type\":\"Post\",\"relationName\":\"PostToUser\"},{\"name\":\"managedCategories\",\"kind\":\"object\",\"type\":\"Category\",\"relationName\":\"CategoryModerator\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Post\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"published\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"content\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"image\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"author\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"PostToUser\"},{\"name\":\"authorId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"category\",\"kind\":\"object\",\"type\":\"Category\",\"relationName\":\"CategoryToPost\"},{\"name\":\"categoryId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"searchText\",\"kind\":\"scalar\",\"type\":\"String\"}],\"dbName\":null},\"Category\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"slug\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"posts\",\"kind\":\"object\",\"type\":\"Post\",\"relationName\":\"CategoryToPost\"},{\"name\":\"moderators\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"CategoryModerator\"}],\"dbName\":null},\"Invoice\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"customerName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"customerEmail\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"InvoiceStatus\"},{\"name\":\"invoiceDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"invoiceNumber\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"total\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"items\",\"kind\":\"object\",\"type\":\"InvoiceItem\",\"relationName\":\"InvoiceToInvoiceItem\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"InvoiceItem\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"invoice\",\"kind\":\"object\",\"type\":\"Invoice\",\"relationName\":\"InvoiceToInvoiceItem\"},{\"name\":\"invoiceId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"quantity\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"price\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"total\",\"kind\":\"scalar\",\"type\":\"Decimal\"}],\"dbName\":null},\"Translation\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"key\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"locale\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"value\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await Promise.resolve().then(() => __importStar(require('node:buffer')));
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await Promise.resolve().then(() => __importStar(require("@prisma/client/runtime/query_compiler_bg.postgresql.js"))),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await Promise.resolve().then(() => __importStar(require("@prisma/client/runtime/query_compiler_bg.postgresql.wasm-base64.js")));
        return await decodeBase64AsWasm(wasm);
    }
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map