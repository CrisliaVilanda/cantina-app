/*
  Warnings:

  - Added the required column `formaPagamento` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FormaPagamento" AS ENUM ('PIX', 'CREDITO', 'DEBITO', 'DINHEIRO');

-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "formaPagamento" "FormaPagamento" NOT NULL;
