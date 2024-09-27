/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "id" SET DEFAULT concat('gam_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Guest" ALTER COLUMN "id" SET DEFAULT concat('gst_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text), '-', '')),
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserGame" ALTER COLUMN "id" SET DEFAULT concat('usg_', replace(cast(gen_random_uuid() as text), '-', ''));
