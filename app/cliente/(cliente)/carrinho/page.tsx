"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useClient } from "@/app/cliente/(cliente)/context/ClientContext";
import { confirmarPedido } from "@/app/actions/pedido.actions";

type FormaPagamento =
  | "PIX"
  | "CREDITO"
  | "DEBITO"
  | "DINHEIRO"
  | "";

export default function CarrinhoPage() {
  const router = useRouter();

  const {
    nomeCliente,
    carrinho,
    totalCarrinho,
    alterarQuantidade,
    removerDoCarrinho,
    limparCarrinho,
    sessaoCarregada,
    pedidoEmProcessamento,
    setPedidoEmProcessamento,
  } = useClient();

  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>("");

  async function handleConfirmarPedido() {
    setErro("");

    if (!nomeCliente?.trim()) {
      setErro("Nome do cliente não encontrado.");
      return;
    }

    if (carrinho.length === 0) {
      setErro("Adicione pelo menos um item ao pedido.");
      return;
    }
    setEnviando(true);
    setPedidoEmProcessamento(true);
    setErro("");


    if (!formaPagamento) {
      setErro("Selecione uma forma de pagamento.");
      return;
    }

    setEnviando(true);

    try {
      const resultado = await confirmarPedido({
        cliente: nomeCliente,
        formaPagamento,
        itens: carrinho.map((item) => ({
          cardapioId: item.id,
          quantidade: item.quantidade,
        })),
      });

      if (!resultado.success || !resultado.pedidoId) {
        throw new Error(
          resultado.error ??
          "Não foi possível confirmar o pedido."
        );
      }

      limparCarrinho();

      router.push(
        `/cliente/pedido/${resultado.pedidoId}`
      );
    } catch (error) {
      setPedidoEmProcessamento(false);

      setErro(
        error instanceof Error
          ? error.message
          : "Erro ao confirmar pedido."
      );
    } finally {
      setEnviando(false);
    }
  }
  if (enviando) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center">
        <div className="mb-6 h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />

        <h1 className="text-2xl font-bold">
          Confirmando seu pedido...
        </h1>

        <p className="mt-2 text-muted-foreground">
          Aguarde enquanto registramos seu pedido.
        </p>
      </div>
    );
  }
  if (!sessaoCarregada) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />

          <p className="text-muted-foreground">
            Carregando seu pedido...
          </p>
        </div>
      </div>
    );
  }

  if (sessaoCarregada && carrinho.length === 0 && !pedidoEmProcessamento) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold">
          Seu carrinho está vazio
        </h1>

        <p className="mt-3 text-muted-foreground">
          Adicione alguns itens do cardápio para continuar.
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
    <div className="relative mx-auto max-w-4xl">
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
                    aria-label={`Diminuir quantidade de ${item.nome}`}
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
                    aria-label={`Aumentar quantidade de ${item.nome}`}
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
                    aria-label={`Remover ${item.nome} do carrinho`}
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
        <div
          role="alert"
          className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
        >
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
        <div className="mt-6">
          <h2 className="text-lg font-semibold">
            Forma de pagamento
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Selecione como você deseja pagar.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setFormaPagamento("PIX")}
              disabled={enviando}
              className={`rounded-lg border p-4 text-left transition ${formaPagamento === "PIX"
                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500"
                : "hover:bg-muted"
                }`}
            >
              <p className="font-semibold">
                PIX
              </p>

              <p className="text-sm text-muted-foreground">
                Pagamento via PIX
              </p>
            </button>

            <button
              type="button"
              onClick={() => setFormaPagamento("CREDITO")}
              disabled={enviando}
              className={`rounded-lg border p-4 text-left transition ${formaPagamento === "CREDITO"
                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500"
                : "hover:bg-muted"
                }`}
            >
              <p className="font-semibold">
                Cartão de crédito
              </p>

              <p className="text-sm text-muted-foreground">
                Pagamento no crédito
              </p>
            </button>

            <button
              type="button"
              onClick={() => setFormaPagamento("DEBITO")}
              disabled={enviando}
              className={`rounded-lg border p-4 text-left transition ${formaPagamento === "DEBITO"
                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500"
                : "hover:bg-muted"
                }`}
            >
              <p className="font-semibold">
                Cartão de débito
              </p>

              <p className="text-sm text-muted-foreground">
                Pagamento no débito
              </p>
            </button>

            <button
              type="button"
              onClick={() => setFormaPagamento("DINHEIRO")}
              disabled={enviando}
              className={`rounded-lg border p-4 text-left transition ${formaPagamento === "DINHEIRO"
                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500"
                : "hover:bg-muted"
                }`}
            >
              <p className="font-semibold">
                Dinheiro
              </p>

              <p className="text-sm text-muted-foreground">
                Pagamento em espécie
              </p>
            </button>
          </div>
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
            className="flex-1 rounded-md bg-green-600 px-4 py-3 
            font-semibold text-white transition-colors hover:bg-green-700 
            disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirmar pedido

          </button>
        </div>
        {pedidoEmProcessamento && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="flex flex-col items-center gap-4 rounded-2xl border bg-card px-8 py-7 shadow-xl animate-in fade-in zoom-in-95 duration-300">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />

              <div className="text-center">
                <p className="text-lg font-semibold">
                  Processando pedido...
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Aguarde um momento.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}