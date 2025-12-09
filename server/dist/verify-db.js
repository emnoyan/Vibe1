"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./generated/prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const url = new URL(process.env.DATABASE_URL);
url.searchParams.delete('sslmode');
const connectionString = url.toString();
const pool = new pg_1.Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
});
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('Checking translations in DB...');
    const translations = await prisma.$queryRaw `SELECT * FROM "Translation" WHERE "key" = 'invoices.delete_paid_error'`;
    console.log('Found translations:', JSON.stringify(translations, null, 2));
    await prisma.$disconnect();
}
main();
//# sourceMappingURL=verify-db.js.map