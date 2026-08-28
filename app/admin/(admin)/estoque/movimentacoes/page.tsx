import { prisma } from "@/lib/prisma";
import { TipoMovimentacao } from "@prisma/client";

function formatarData(data: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(data);
}

function formatarNumero(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(valor);
}

function formatarMoeda(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

function obterLabelTipo(tipo: TipoMovimentacao) {
  switch (tipo) {
    case TipoMovimentacao.ENTRADA:
      return "Entrada";

    case TipoMovimentacao.SAIDA:
      return "Saída";

    case TipoMovimentacao.AJUSTE:
      return "Ajuste";

    default:
      return tipo;
  }
}

function obterClasseTipo(tipo: TipoMovimentacao) {
  switch (tipo) {
    case TipoMovimentacao.ENTRADA:
      return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300";

    case TipoMovimentacao.SAIDA:
      return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";

    case TipoMovimentacao.AJUSTE:
      return "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300";

    default:
      return "bg-muted text-muted-foreground";
  }
}

export default async function MovimentacoesPage() {
  const movimentacoes = await prisma.movimentacaoEstoque.findMany({
    include: {
      produto: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Movimentações de estoque
          </h1>

          <p className="mt-1 text-muted-foreground">
            Consulte o histórico de entradas, saídas e ajustes do estoque.
          </p>
        </div>

        <a
          href="/admin/estoque/entradas"
          className="rounded-lg bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          + Nova entrada
        </a>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        {movimentacoes.length === 0 ? (
          <div className="p-10 text-center">
            <h2 className="text-lg font-semibold">
              Nenhuma movimentação registrada
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              As entradas, saídas e ajustes realizados no estoque aparecerão
              aqui.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-4 py-4 text-left font-semibold">
                    Data
                  </th>

                  <th className="px-4 py-4 text-left font-semibold">
                    Produto
                  </th>

                  <th className="px-4 py-4 text-center font-semibold">
                    Tipo
                  </th>

                  <th className="px-4 py-4 text-right font-semibold">
                    Quantidade
                  </th>

                  <th className="px-4 py-4 text-right font-semibold">
                    Custo unitário
                  </th>

                  <th className="px-4 py-4 text-left font-semibold">
                    Observação
                  </th>
                </tr>
              </thead>

              <tbody>
                {movimentacoes.map((movimentacao) => {
                  const quantidade = Number(movimentacao.quantidade);

                  const custoUnitario =
                    movimentacao.custoUnitario !== null
                      ? Number(movimentacao.custoUnitario)
                      : null;

                  return (
                    <tr
                      key={movimentacao.id}
                      className="border-b last:border-0 hover:bg-muted/30"
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        {formatarData(movimentacao.createdAt)}
                      </td>

                      <td className="px-4 py-4">
                        <div>
                          <p className="font-semibold">
                            {movimentacao.produto.nome}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {movimentacao.produto.categoria}
                          </p>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-center">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${obterClasseTipo(
                            movimentacao.tipo,
                          )}`}
                        >
                          {obterLabelTipo(movimentacao.tipo)}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-right font-semibold">
                        <span
                          className={
                            movimentacao.tipo === TipoMovimentacao.SAIDA
                              ? "text-red-600"
                              : movimentacao.tipo ===
                                TipoMovimentacao.ENTRADA
                                ? "text-green-600"
                                : "text-orange-600"
                          }
                        >
                          {movimentacao.tipo === TipoMovimentacao.SAIDA
                            ? "-"
                            : "+"}
                          {formatarNumero(quantidade)}
                        </span>

                        <span className="ml-1 text-xs text-muted-foreground">
                          {movimentacao.produto.unidadeMedida}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-right">
                        {custoUnitario !== null
                          ? formatarMoeda(custoUnitario)
                          : "—"}
                      </td>

                      <td className="max-w-xs px-4 py-4">
                        <span className="text-muted-foreground">
                          {movimentacao.observacao || "—"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        Total de movimentações:{" "}
        <span className="font-semibold text-foreground">
          {movimentacoes.length}
        </span>
      </div>
    </div>
  );
}