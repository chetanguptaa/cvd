-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text), '-', '')),
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL DEFAULT concat('gam_', replace(cast(gen_random_uuid() as text), '-', '')),

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGame" (
    "id" TEXT NOT NULL DEFAULT concat('usg_', replace(cast(gen_random_uuid() as text), '-', '')),
    "userId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,

    CONSTRAINT "UserGame_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UserGame" ADD CONSTRAINT "UserGame_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGame" ADD CONSTRAINT "UserGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
