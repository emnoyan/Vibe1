-- CreateEnum
CREATE TYPE "test"."UserStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "test"."User" ADD COLUMN     "status" "test"."UserStatus" NOT NULL DEFAULT 'ACTIVE';
