"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { criarEntradaEstoque } from "@/app/actions/estoque/entradas.actions";

type Produto = {
  id: string;
  nome: string;
  categoria: string;
  unidadeMedida: string;
  estoqueMinimo: number;
};

type EntradaEstoqueFormProps = {
  produtos: Produto[];
};

export default function EntradaEstoqueForm({
  produtos,
}: EntradaEstoqueFormProps) {
  const router = useRouter();

  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [custoUnitario, setCustoUnitario] = useState("");
  const [observacao, setObservacao] = useState("");

  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro("");
    setSalvando(true);

    try {
      const resultado = await criarEntradaEstoque({
        produtoId,
        quantidade: Number(quantidade.replace(",", ".")),
        custoUnitario: Number(custoUnitario.replace(",", ".")),
        observacao,
      });

      if (!resultado.success) {
        setErro(
          resultado.error ?? "Não foi possível registrar a entrada.",
        );
        return;
      }
      router.push("/admin/estoque/movimentacoes");
      router.refresh();

    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível registrar a entrada.",
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link
          href="/admin/estoque"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Voltar para estoque
        </Link>

        <h1 className="mt-4 text-3xl font-bold">
          Entrada de estoque
        </h1>

        <p className="mt-1 text-muted-foreground">
          Registre a entrada de alimentos e outros produtos utilizados pela
          cantina.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border bg-card p-6"
      >
        <div className="space-y-2">
          <label
            htmlFor="produto"
            className="text-sm font-medium"
          >
            Produto
          </label>

          <select
            id="produto"
            value={produtoId}
            onChange={(event) => setProdutoId(event.target.value)}
            required
            className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">
              Selecione um produto
            </option>

            {produtos.map((produto) => (
              <option
                key={produto.id}
                value={produto.id}
              >
                {produto.nome} — {produto.categoria}
              </option>
            ))}
          </select>

          {produtos.length === 0 && (
            <p className="text-sm text-orange-600">
              Nenhum produto cadastrado.
            </p>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="quantidade"
              className="text-sm font-medium"
            >
              Quantidade
            </label>

            <input
              id="quantidade"
              type="number"
              min="0.001"
              step="0.001"
              value={quantidade}
              onChange={(event) =>
                setQuantidade(event.target.value)
              }
              placeholder="Ex.: 50"
              required
              className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
            />

            <p className="text-xs text-muted-foreground">
              Unidade:{" "}
              {produtoId
                ? produtos.find(
                  (produto) => produto.id === produtoId,
                )?.unidadeMedida ?? "-"
                : "-"}
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="custoUnitario"
              className="text-sm font-medium"
            >
              Custo unitário
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                R$
              </span>

              <input
                id="custoUnitario"
                type="number"
                min="0"
                step="0.01"
                value={custoUnitario}
                onChange={(event) =>
                  setCustoUnitario(event.target.value)
                }
                placeholder="0,00"
                required
                className="w-full rounded-lg border bg-background py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <p className="text-xs text-muted-foreground">
              Custo pago por unidade.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="observacao"
            className="text-sm font-medium"
          >
            Observação
          </label>

          <textarea
            id="observacao"
            value={observacao}
            onChange={(event) =>
              setObservacao(event.target.value)
            }
            placeholder="Ex.: Compra realizada no fornecedor X"
            rows={4}
            className="w-full resize-none rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {erro && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            {erro}
          </div>
        )}


        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/admin/estoque"
            className="rounded-lg border px-5 py-3 text-center text-sm font-semibold hover:bg-muted"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={salvando || produtos.length === 0}
            className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {salvando
              ? "Registrando..."
              : "Registrar entrada"}
          </button>
        </div>
      </form>
    </div>
  );
}