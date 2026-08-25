/*
  Warnings:

  - You are about to drop the column `Categoria` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `estoqueMinimo` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `produto` on the `Estoque` table. All the data in the column will be lost.
  - You are about to drop the column `unidadeMedida` on the `Estoque` table. All the data in the column will be lost.
  - You are about to alter the column `quantidadeAtual` on the `Estoque` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,3)`.
  - A unique constraint covering the columns `[produtoId]` on the table `Estoque` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `produtoId` to the `Estoque` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Estoque" DROP COLUMN "Categoria",
DROP COLUMN "estoqueMinimo",
DROP COLUMN "produto",
DROP COLUMN "unidadeMedida",
ADD COLUMN     "produtoId" TEXT NOT NULL,
ALTER COLUMN "quantidadeAtual" SET DATA TYPE DECIMAL(10,3);

-- CreateIndex
CREATE UNIQUE INDEX "Estoque_produtoId_key" ON "Estoque"("produtoId");

-- AddForeignKey
ALTER TABLE "Estoque" ADD CONSTRAINT "Estoque_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
