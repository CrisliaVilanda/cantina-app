/*
  Warnings:

  - Added the required column `categoria` to the `Cardapio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `Cardapio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cardapio" ADD COLUMN     "categoria" TEXT NOT NULL,
ADD COLUMN     "descricao" TEXT NOT NULL;
