-- CreateTable
CREATE TABLE "Notiification" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notiification_pkey" PRIMARY KEY ("id")
);
