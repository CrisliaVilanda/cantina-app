"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useClient } from "@/app/cliente/context/ClientContext";
import { confirmarPedido } from "@/app/actions/pedido.actions";

export default function CarrinhoPage() {
  const router = useRouter();

  const {
    nomeCliente,
    carrinho,
    totalCarrinho,
    alterarQuantidade,
    removerDoCarrinho,
    limparCarrinho,
  } = useClient();

  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  async function handleConfirmarPedido() {
    if (!nomeCliente) {
      setErro(
        "Nome do cliente não encontrado."
      );
      return;
    }

    if (carrinho.length === 0) {
      setErro(
        "Adicione pelo menos um item ao pedido."
      );
      return;
    }

    setEnviando(true);
    setErro("");

    try {
      const resultado =
        await confirmarPedido({
          cliente: nomeCliente,
          itens: carrinho.map((item) => ({
            cardapioId: item.id,
            quantidade: item.quantidade,
          })),
        });

      if (!resultado.success) {
        throw new Error(
          "Não foi possível confirmar o pedido."
        );
      }

      limparCarrinho();

      router.push(
        `/cliente/pedido/${resultado.pedidoId}`
      );
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao confirmar pedido."
      );
    } finally {
      setEnviando(false);
    }
  }

  if (carrinho.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold">
          Seu carrinho está vazio
        </h1>

        <p className="mt-3 text-muted-foreground">
          Adicione alguns itens do cardápio para
          continuar.
        </p>

        <Link
          href="/cliente/menu"
          className="mt-6 rounded-md bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-600"
        >
          Ver cardápio
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Meu pedido
        </h1>

        <p className="mt-2 text-muted-foreground">
          Confira os itens antes de confirmar.
        </p>
      </div>

      <div className="space-y-4">
        {carrinho.map((item) => {
          const subtotal =
            item.preco * item.quantidade;

          return (
            <div
              key={item.id}
              className="rounded-xl border bg-card p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    {item.nome}
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    R$ {item.preco.toFixed(2)} cada
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    disabled={enviando}
                    onClick={() =>
                      alterarQuantidade(
                        item.id,
                        item.quantidade - 1
                      )
                    }
                    className="rounded-md border p-2 hover:bg-muted disabled:opacity-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <span className="min-w-8 text-center font-semibold">
                    {item.quantidade}
                  </span>

                  <button
                    type="button"
                    disabled={enviando}
                    onClick={() =>
                      alterarQuantidade(
                        item.id,
                        item.quantidade + 1
                      )
                    }
                    className="rounded-md border p-2 hover:bg-muted disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    disabled={enviando}
                    onClick={() =>
                      removerDoCarrinho(item.id)
                    }
                    className="rounded-md p-2 text-red-500 hover:bg-red-50 disabled:opacity-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Subtotal
                  </p>

                  <p className="text-lg font-bold">
                    R$ {subtotal.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {erro && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {erro}
        </div>
      )}

      <div className="mt-8 rounded-xl border bg-card p-6">
        <div className="flex items-center justify-between">
          <span className="text-lg">
            Total do pedido
          </span>

          <span className="text-2xl font-bold">
            R$ {totalCarrinho.toFixed(2)}
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/cliente/menu"
            className="flex-1 rounded-md border px-4 py-3 text-center font-semibold hover:bg-muted"
          >
            Continuar comprando
          </Link>

          <button
            type="button"
            disabled={enviando}
            onClick={handleConfirmarPedido}
            className="flex-1 rounded-md bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {enviando
              ? "Enviando pedido..."
              : "Confirmar pedido"}
          </button>
        </div>
      </div>
    </div>
  );
}