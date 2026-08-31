"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { criarEntradaEstoque } from "@/app/actions/estoque/entradas.actions";

type Produto = {
  id: string;
  nome: string;
  unidadeMedida: string;
};

type EntradaFormProps = {
  produtos: Produto[];
};

export default function EntradaForm({
  produtos,
}: EntradaFormProps) {
  const router = useRouter();

  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [custoUnitario, setCustoUnitario] = useState("");
  const [observacao, setObservacao] = useState("");

  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (salvando) {
      return;
    }

    setErro("");

    if (!produtoId) {
      setErro("Selecione um produto.");
      return;
    }

    const quantidadeNumerica = Number(
      quantidade.replace(",", "."),
    );

    const custoNumerico = Number(
      custoUnitario.replace(",", "."),
    );

    if (
      !Number.isFinite(quantidadeNumerica) ||
      quantidadeNumerica <= 0
    ) {
      setErro("A quantidade deve ser maior que zero.");
      return;
    }

    if (
      !Number.isFinite(custoNumerico) ||
      custoNumerico < 0
    ) {
      setErro("Informe um custo unitário válido.");
      return;
    }

    setSalvando(true);

    try {
      const resultado = await criarEntradaEstoque({
        produtoId,
        quantidade: quantidadeNumerica,
        custoUnitario: custoNumerico,
        observacao,
      });

      if (!resultado.success) {
        setErro(
          resultado.error ??
          "Não foi possível registrar a entrada.",
        );

        return;
      }

      router.push("/admin/estoque/movimentacoes");
    } catch (error) {
      console.error(
        "Erro ao enviar entrada:",
        error,
      );

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
          onChange={(event) =>
            setProdutoId(event.target.value)
          }
          required
          disabled={salvando}
          className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">
            Selecione um produto
          </option>

          {produtos.map((produto) => (
            <option
              key={produto.id}
              value={produto.id}
            >
              {produto.nome} ({produto.unidadeMedida})
            </option>
          ))}
        </select>

        {produtos.length === 0 && (
          <p className="text-sm text-orange-600">
            Nenhum produto ativo foi cadastrado.
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
            placeholder="Ex.: 10"
            required
            disabled={salvando}
            className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="custoUnitario"
            className="text-sm font-medium"
          >
            Custo unitário
          </label>

          <input
            id="custoUnitario"
            type="number"
            min="0"
            step="0.01"
            value={custoUnitario}
            onChange={(event) =>
              setCustoUnitario(event.target.value)
            }
            placeholder="Ex.: 25,90"
            required
            disabled={salvando}
            className="w-full rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
          />
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
          disabled={salvando}
          className="w-full resize-none rounded-lg border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {erro && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {erro}
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/admin/estoque/movimentacoes"
          className="rounded-lg border px-5 py-3 text-center text-sm font-semibold hover:bg-muted"
        >
          Cancelar
        </Link>

        <button
          type="submit"
          disabled={
            salvando ||
            produtos.length === 0
          }
          className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {salvando
            ? "Registrando..."
            : "Registrar entrada"}
        </button>
      </div>
    </form>
  );
}