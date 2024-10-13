/*
  Warnings:

  - You are about to drop the column `createdByGuestId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `createdByUserId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `guestWinnerId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `userWinnerId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `guestId` on the `UserGame` table. All the data in the column will be lost.
  - You are about to drop the `Guest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_createdByGuestId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_createdByUserId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_guestWinnerId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_userWinnerId_fkey";

-- DropForeignKey
ALTER TABLE "UserGame" DROP CONSTRAINT "UserGame_guestId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "UserGame_userId_guestId_gameId_key";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "createdByGuestId",
DROP COLUMN "createdByUserId",
DROP COLUMN "guestWinnerId",
DROP COLUMN "userWinnerId",
ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "winnerId" TEXT,
ALTER COLUMN "id" SET DEFAULT concat('gam_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "password",
ALTER COLUMN "id" SET DEFAULT concat('gst_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "UserGame" DROP COLUMN "guestId",
ALTER COLUMN "id" SET DEFAULT concat('grm_', replace(cast(gen_random_uuid() as text), '-', ''));

-- DropTable
DROP TABLE "Guest";

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
