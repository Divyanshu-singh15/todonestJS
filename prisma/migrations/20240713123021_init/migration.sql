/*
  Warnings:

  - You are about to drop the column `updatedat` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `updatedAT` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "updatedat",
ADD COLUMN     "updatedAT" TIMESTAMP(3) NOT NULL;
