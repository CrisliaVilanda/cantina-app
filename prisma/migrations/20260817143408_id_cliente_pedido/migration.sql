/*
  Warnings:

  - A unique constraint covering the columns `[numero]` on the table `Pedido` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "numero" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pedido_numero_key" ON "Pedido"("numero");
