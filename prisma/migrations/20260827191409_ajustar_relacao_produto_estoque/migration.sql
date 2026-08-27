-- DropForeignKey
ALTER TABLE "Estoque" DROP CONSTRAINT "Estoque_produtoId_fkey";

-- AddForeignKey
ALTER TABLE "Estoque" ADD CONSTRAINT "Estoque_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
