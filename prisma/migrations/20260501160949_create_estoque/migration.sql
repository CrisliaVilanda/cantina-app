-- CreateTable
CREATE TABLE "Estoque" (
    "id" TEXT NOT NULL,
    "produto" TEXT NOT NULL,
    "unidadeMedida" TEXT NOT NULL,
    "quantidadeAdquirida" INTEGER NOT NULL,
    "quantidadeSaidas" INTEGER NOT NULL,
    "dataAquisicao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Estoque_pkey" PRIMARY KEY ("id")
);
