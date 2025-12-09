import { PrismaClient } from 'generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const url = new URL(process.env.DATABASE_URL!);
url.searchParams.delete('sslmode');
const connectionString = url.toString();

const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Checking translations in DB...');
    const translations = await prisma.$queryRaw`SELECT * FROM "Translation" WHERE "key" = 'invoices.delete_paid_error'`;
    console.log('Found translations:', JSON.stringify(translations, null, 2));
    await prisma.$disconnect();
}

main();
