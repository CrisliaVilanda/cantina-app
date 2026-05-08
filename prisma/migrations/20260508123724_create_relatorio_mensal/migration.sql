-- CreateTable
CREATE TABLE "RelatorioMensal" (
    "id" TEXT NOT NULL,
    "mes" INTEGER NOT NULL,
    "ano" INTEGER NOT NULL,
    "totalVendas" INTEGER NOT NULL,
    "totalArrecadado" DECIMAL(10,2) NOT NULL,
    "itemMaisVendido" TEXT,
    "quantidadeMaisVendido" INTEGER,
    "estoqueCritico" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RelatorioMensal_pkey" PRIMARY KEY ("id")
);
