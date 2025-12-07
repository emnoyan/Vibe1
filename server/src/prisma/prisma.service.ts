import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        // Parse the URL to remove sslmode=require, because we manually set ssl options below.
        // This fixes the conflict that causes connection errors with Aiven.
        const url = new URL(process.env.DATABASE_URL!);
        url.searchParams.delete('sslmode');
        const connectionString = url.toString();

        const pool = new Pool({
            connectionString,
            ssl: { rejectUnauthorized: false },
        });
        const adapter = new PrismaPg(pool);
        super({ adapter });
    }
}
