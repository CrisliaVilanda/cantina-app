-- CreateTable
CREATE TABLE "Estoque" (
    "id" TEXT NOT NULL,
    "produto" TEXT NOT NULL,
    "Categoria" TEXT NOT NULL,
    "unidadeMedida" TEXT NOT NULL,
    "quantidadeAtual" INTEGER NOT NULL,
    "estoqueMinimo" INTEGER NOT NULL DEFAULT 0,
    "custoUnitario" DECIMAL(10,2) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Estoque_pkey" PRIMARY KEY ("id")
);
