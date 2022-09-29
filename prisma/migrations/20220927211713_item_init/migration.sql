-- CreateTable
CREATE TABLE "Items" (
    "sku" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "sale" BOOLEAN NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("sku")
);
