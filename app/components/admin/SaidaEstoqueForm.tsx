"use client";

import { useState } from "react";

type ProdutoSaida = {
  id: string;
  nome: string;
  unidadeMedida: string;
  quantidadeAtual: number;
};

type SaidaFormProps = {
  produtos: ProdutoSaida[];
};

export default function SaidaForm({
  produtos,
}: SaidaFormProps) {
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [observacao, setObservacao] = useState("");

  const produtoSelecionado = produtos.find(
    (produto) => produto.id === produtoId,
  );

  const quantidadeNumerica = Number(quantidade);

  const quantidadeInvalida =
    produtoSelecionado &&
    Number.isFinite(quantidadeNumerica) &&
    quantidadeNumerica > produtoSelecionado.quantidadeAtual;

  return (
    <form className="space-y-6 rounded-xl border bg-card p-6">
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
          className="w-full rounded-lg border bg-background px-4 py-3"
        >
          <option value="">
            Selecione um produto
          </option>

          {produtos.map((produto) => (
            <option
              key={produto.id}
              value={produto.id}
            >
              {produto.nome}
            </option>
          ))}
        </select>
      </div>

      {produtoSelecionado && (
        <div className="rounded-lg bg-muted p-4">
          <p className="text-sm text-muted-foreground">
            Estoque disponível
          </p>

          <p className="text-lg font-semibold">
            {produtoSelecionado.quantidadeAtual.toFixed(3)}{" "}
            {produtoSelecionado.unidadeMedida}
          </p>
        </div>
      )}

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
          min="0"
          step="0.001"
          value={quantidade}
          onChange={(event) =>
            setQuantidade(event.target.value)
          }
          className="w-full rounded-lg border bg-background px-4 py-3"
        />

        {quantidadeInvalida && (
          <p className="text-sm text-red-600">
            A quantidade informada é maior que o estoque disponível.
          </p>
        )}
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
          placeholder="Ex.: Utilizado na preparação do almoço"
          rows={4}
          className="w-full rounded-lg border bg-background px-4 py-3"
        />
      </div>

      <button
        type="submit"
        disabled={
          !produtoId ||
          !quantidade ||
          quantidadeInvalida
        }
        className="w-full rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Registrar saída
      </button>
    </form>
  );
}