import { obterProdutosComEstoque } from "@/lib/estoque";

export default async function EstoquePage() {
  const produtos =
    await obterProdutosComEstoque();

  const produtosBaixo = produtos.filter(
    (produto) => produto.estoqueBaixo
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Estoque
        </h1>

        <p className="mt-1 text-muted-foreground">
          Controle de produtos e insumos da cantina.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Produtos cadastrados
          </p>

          <p className="mt-2 text-3xl font-bold">
            {produtos.length}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Estoque baixo
          </p>

          <p className="mt-2 text-3xl font-bold text-orange-500">
            {produtosBaixo.length}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Produtos ativos
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {
              produtos.filter(
                (produto) => produto.ativo
              ).length
            }
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-card">
        <div className="border-b p-5">
          <h2 className="text-lg font-semibold">
            Situação do estoque
          </h2>
        </div>

        {produtos.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Nenhum produto cadastrado.
          </div>
        ) : (
          <div className="divide-y">
            {produtos.map((produto) => (
              <div
                key={produto.id}
                className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold">
                    {produto.nome}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {produto.categoria} ·{" "}
                    {produto.unidadeMedida}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Estoque atual
                    </p>

                    <p
                      className={`font-semibold ${produto.estoqueBaixo
                          ? "text-orange-500"
                          : "text-green-600"
                        }`}
                    >
                      {produto.estoqueAtual}{" "}
                      {produto.unidadeMedida}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Mínimo
                    </p>

                    <p className="font-semibold">
                      {produto.estoqueMinimo}{" "}
                      {produto.unidadeMedida}
                    </p>
                  </div>

                  <div>
                    {produto.estoqueBaixo ? (
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-950 dark:text-orange-300">
                        Estoque baixo
                      </span>
                    ) : (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-950 dark:text-green-300">
                        Normal
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}