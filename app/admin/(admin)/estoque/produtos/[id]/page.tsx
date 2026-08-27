import { notFound } from "next/navigation";
import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { atualizarProduto } from "@/app/actions/produtos.actions";

type ProdutoEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProdutoEditPage({
  params,
}: ProdutoEditPageProps) {
  const { id } = await params;

  const produto = await prisma.produto.findUnique({
    where: {
      id,
    },
  });

  if (!produto) {
    notFound();
  }

  async function atualizarProdutoAction(
    formData: FormData,
  ) {
    "use server";

    await atualizarProduto(id, formData);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <div className="mb-2">
          <Link
            href="/admin/estoque/produtos"
            className="text-sm text-muted-foreground hover:underline"
          >
            ← Voltar para produtos
          </Link>
        </div>

        <h1 className="text-3xl font-bold">
          Editar produto
        </h1>

        <p className="mt-2 text-muted-foreground">
          Atualize as informações do produto cadastrado no
          estoque.
        </p>
      </div>

      <form
        action={atualizarProdutoAction}
        className="space-y-6 rounded-xl border bg-card p-6 shadow-sm"
      >
        <div className="space-y-2">
          <label
            htmlFor="nome"
            className="text-sm font-medium"
          >
            Nome do produto
          </label>

          <input
            id="nome"
            name="nome"
            type="text"
            defaultValue={produto.nome}
            required
            className="w-full rounded-md border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex.: Arroz"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="categoria"
              className="text-sm font-medium"
            >
              Categoria
            </label>

            <input
              id="categoria"
              name="categoria"
              type="text"
              defaultValue={produto.categoria}
              required
              className="w-full rounded-md border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex.: Grãos"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="unidadeMedida"
              className="text-sm font-medium"
            >
              Unidade de medida
            </label>

            <select
              id="unidadeMedida"
              name="unidadeMedida"
              defaultValue={produto.unidadeMedida}
              required
              className="w-full rounded-md border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="KG">
                Quilograma (kg)
              </option>

              <option value="G">
                Grama (g)
              </option>

              <option value="L">
                Litro (L)
              </option>

              <option value="ML">
                Mililitro (ml)
              </option>

              <option value="UN">
                Unidade (un)
              </option>

              <option value="CX">
                Caixa
              </option>

              <option value="PACOTE">
                Pacote
              </option>

              <option value="FD">
                Fardo
              </option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="estoqueMinimo"
            className="text-sm font-medium"
          >
            Estoque mínimo
          </label>

          <input
            id="estoqueMinimo"
            name="estoqueMinimo"
            type="number"
            min="0"
            step="0.001"
            defaultValue={produto.estoqueMinimo.toString()}
            required
            className="w-full rounded-md border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />

          <p className="text-xs text-muted-foreground">
            Quando o estoque atingir ou ficar abaixo desse
            valor, o produto será considerado em baixa.
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-4">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              name="ativo"
              value="true"
              defaultChecked={produto.ativo}
              className="h-4 w-4 rounded border-gray-300"
            />

            <div>
              <p className="font-medium">
                Produto ativo
              </p>

              <p className="text-sm text-muted-foreground">
                Produtos inativos não devem aparecer nas
                operações que utilizam o estoque.
              </p>
            </div>
          </label>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
          <Link
            href="/admin/estoque/produtos"
            className="rounded-md border px-5 py-3 text-center font-semibold hover:bg-muted"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            className="rounded-md bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Salvar alterações
          </button>
        </div>
      </form>
    </div>
  );
}