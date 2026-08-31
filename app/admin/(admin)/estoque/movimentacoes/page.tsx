import Link from "next/link";

import { prisma } from "@/lib/prisma";

export default async function MovimentacoesPage() {
  const movimentacoes =
    await prisma.movimentacaoEstoque.findMany({
      select: {
        id: true,
        tipo: true,
        quantidade: true,
        custoUnitario: true,
        observacao: true,
        createdAt: true,
        produto: {
          select: {
            nome: true,
            unidadeMedida: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 100,
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Movimentações de estoque
          </h1>

          <p className="mt-1 text-muted-foreground">
            Histórico das entradas, saídas e ajustes do estoque.
          </p>
        </div>

        <Link
          href="/admin/estoque/entrada"
          className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          + Nova entrada
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        {movimentacoes.length === 0 ? (
          <div className="p-10 text-center">
            <h2 className="text-lg font-semibold">
              Nenhuma movimentação encontrada
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              As movimentações realizadas aparecerão aqui.
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
                  const quantidade = Number(
                    movimentacao.quantidade,
                  );

                  const custoUnitario =
                    movimentacao.custoUnitario !== null
                      ? Number(
                        movimentacao.custoUnitario,
                      )
                      : null;

                  return (
                    <tr
                      key={movimentacao.id}
                      className="border-b last:border-0 hover:bg-muted/30"
                    >
                      <td className="px-4 py-4">
                        {new Intl.DateTimeFormat(
                          "pt-BR",
                          {
                            dateStyle: "short",
                            timeStyle: "short",
                          },
                        ).format(
                          new Date(
                            movimentacao.createdAt,
                          ),
                        )}
                      </td>

                      <td className="px-4 py-4">
                        <div>
                          <p className="font-semibold">
                            {movimentacao.produto.nome}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {movimentacao.produto.unidadeMedida}
                          </p>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-center">
                        <span
                          className={
                            movimentacao.tipo ===
                              "ENTRADA"
                              ? "rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"
                              : movimentacao.tipo ===
                                "SAIDA"
                                ? "rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700"
                                : "rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700"
                          }
                        >
                          {movimentacao.tipo}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-right font-semibold">
                        {quantidade.toFixed(3)}
                      </td>

                      <td className="px-4 py-4 text-right">
                        {custoUnitario !== null
                          ? `R$ ${custoUnitario.toFixed(2)}`
                          : "-"}
                      </td>

                      <td className="max-w-xs px-4 py-4">
                        <span className="text-muted-foreground">
                          {movimentacao.observacao ||
                            "-"}
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
    </div>
  );
}