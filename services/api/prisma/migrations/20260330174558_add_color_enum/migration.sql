/*
  Warnings:

  - The `color` column on the `ProductImage` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ProductColor" AS ENUM ('RED', 'BLUE', 'GREEN', 'BLACK', 'WHITE', 'YELLOW', 'GRAY', 'ORANGE', 'PURPLE', 'VIOLET', 'CYAN');

-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "color",
ADD COLUMN     "color" "ProductColor";
