-- CreateTable
CREATE TABLE "SaldoDiario" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "totalVendas" INTEGER NOT NULL DEFAULT 0,
    "totalArrecadado" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SaldoDiario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SaldoDiario_data_key" ON "SaldoDiario"("data");
