/*
  Warnings:

  - You are about to drop the column `ano` on the `RelatorioMensal` table. All the data in the column will be lost.
  - You are about to drop the column `estoqueCritico` on the `RelatorioMensal` table. All the data in the column will be lost.
  - You are about to drop the column `mes` on the `RelatorioMensal` table. All the data in the column will be lost.
  - You are about to drop the column `quantidadeMaisVendido` on the `RelatorioMensal` table. All the data in the column will be lost.
  - You are about to drop the column `totalArrecadado` on the `RelatorioMensal` table. All the data in the column will be lost.
  - Added the required column `categoriaMaisVendida` to the `RelatorioMensal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referencia` to the `RelatorioMensal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalFaturamento` to the `RelatorioMensal` table without a default value. This is not possible if the table is not empty.
  - Made the column `itemMaisVendido` on table `RelatorioMensal` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "RelatorioMensal" DROP COLUMN "ano",
DROP COLUMN "estoqueCritico",
DROP COLUMN "mes",
DROP COLUMN "quantidadeMaisVendido",
DROP COLUMN "totalArrecadado",
ADD COLUMN     "categoriaMaisVendida" TEXT NOT NULL,
ADD COLUMN     "referencia" TEXT NOT NULL,
ADD COLUMN     "totalFaturamento" DECIMAL(10,2) NOT NULL,
ALTER COLUMN "itemMaisVendido" SET NOT NULL;

-- CreateTable
CREATE TABLE "HistoricoEstoque" (
    "id" TEXT NOT NULL,
    "produto" TEXT NOT NULL,
    "quantidadeAtual" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistoricoEstoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrevisaoVenda" (
    "id" TEXT NOT NULL,
    "cardapioId" TEXT NOT NULL,
    "previsaoProximaSemana" INTEGER NOT NULL,
    "previsaoProximoMes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PrevisaoVenda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Caixa" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Caixa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Despesa" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "categoria" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Despesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogSistema" (
    "id" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "acao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogSistema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "PrevisaoVenda" ADD CONSTRAINT "PrevisaoVenda_cardapioId_fkey" FOREIGN KEY ("cardapioId") REFERENCES "Cardapio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
