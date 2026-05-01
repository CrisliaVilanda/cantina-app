/*
  Warnings:

  - Added the required column `preco` to the `Estoque` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Estoque" ADD COLUMN     "preco" DECIMAL(10,2) NOT NULL;
