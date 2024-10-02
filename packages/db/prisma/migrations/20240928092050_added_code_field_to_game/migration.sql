-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "code" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "id" SET DEFAULT concat('gam_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "Guest" ALTER COLUMN "id" SET DEFAULT concat('gst_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text), '-', ''));

-- AlterTable
ALTER TABLE "UserGame" ALTER COLUMN "id" SET DEFAULT concat('grm_', replace(cast(gen_random_uuid() as text), '-', ''));
