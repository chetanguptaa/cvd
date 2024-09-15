-- DropForeignKey
ALTER TABLE "UserGame" DROP CONSTRAINT "UserGame_userId_fkey";

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "id" SET DEFAULT concat('gam_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" SET DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "UserGame" ADD COLUMN     "guestId" TEXT,
ALTER COLUMN "id" SET DEFAULT concat('usg_', replace(cast(gen_random_uuid() as text), '-', '')),
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL DEFAULT concat('gst_', replace(cast(gen_random_uuid() as text), '-', '')),
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guest_username_key" ON "Guest"("username");

-- AddForeignKey
ALTER TABLE "UserGame" ADD CONSTRAINT "UserGame_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGame" ADD CONSTRAINT "UserGame_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
