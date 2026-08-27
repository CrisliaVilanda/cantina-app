import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProdutoStatusButton from "./ProdutoStatusButton";

export default async function ProdutosPage() {
  const produtos = await prisma.produto.findMany({
    include: {
      estoque: true,
    },
    orderBy: {
      nome: "asc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Produtos
          </h1>

          <p className="mt-1 text-muted-foreground">
            Gerencie os produtos utilizados pela cantina.
          </p>
        </div>

        <Link
          href="/admin/estoque/produtos/novo"
          className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          + Novo produto
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        {produtos.length === 0 ? (
          <div className="p-10 text-center">
            <h2 className="text-lg font-semibold">
              Nenhum produto cadastrado
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Cadastre o primeiro produto para começar a controlar o estoque.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-4 py-4 text-left font-semibold">
                    Produto
                  </th>

                  <th className="px-4 py-4 text-left font-semibold">
                    Categoria
                  </th>

                  <th className="px-4 py-4 text-left font-semibold">
                    Unidade
                  </th>

                  <th className="px-4 py-4 text-right font-semibold">
                    Estoque
                  </th>

                  <th className="px-4 py-4 text-right font-semibold">
                    Mínimo
                  </th>

                  <th className="px-4 py-4 text-center font-semibold">
                    Status
                  </th>

                  <th className="px-4 py-4 text-right font-semibold">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                {produtos.map((produto) => {
                  const quantidade = Number(
                    produto.estoque?.quantidadeAtual ?? 0,
                  );

                  const estoqueMinimo = Number(
                    produto.estoqueMinimo,
                  );

                  const semEstoque = quantidade <= 0;

                  const estoqueBaixo =
                    quantidade > 0 &&
                    quantidade <= estoqueMinimo;

                  return (
                    <tr
                      key={produto.id}
                      className="border-b last:border-0 hover:bg-muted/30"
                    >
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-semibold">
                            {produto.nome}
                          </p>

                          {!produto.ativo && (
                            <span className="text-xs text-muted-foreground">
                              Produto inativo
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        {produto.categoria}
                      </td>

                      <td className="px-4 py-4">
                        {produto.unidadeMedida}
                      </td>

                      <td className="px-4 py-4 text-right font-semibold">
                        {quantidade.toFixed(3)}
                      </td>

                      <td className="px-4 py-4 text-right">
                        {estoqueMinimo.toFixed(3)}
                      </td>

                      <td className="px-4 py-4 text-center">
                        {semEstoque ? (
                          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-950 dark:text-red-300">
                            Sem estoque
                          </span>
                        ) : estoqueBaixo ? (
                          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-950 dark:text-orange-300">
                            Estoque baixo
                          </span>
                        ) : (
                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-950 dark:text-green-300">
                            Normal
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/estoque/produtos/${produto.id}`}
                            className="rounded-md border px-3 py-2 text-xs font-medium hover:bg-muted"
                          >
                            Editar
                          </Link>

                          <ProdutoStatusButton
                            id={produto.id}
                            ativo={produto.ativo}
                          />
                        </div>
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