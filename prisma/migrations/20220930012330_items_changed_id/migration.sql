/*
  Warnings:

  - The primary key for the `Items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sku` on the `Items` table. All the data in the column will be lost.
  - Added the required column `id` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Items" DROP CONSTRAINT "Items_pkey",
DROP COLUMN "sku",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Items_pkey" PRIMARY KEY ("id");
