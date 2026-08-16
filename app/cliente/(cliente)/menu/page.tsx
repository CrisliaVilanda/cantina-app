"use client";

import { useEffect, useState } from "react";
import { useClient } from "@/app/cliente/context/ClientContext";

type CardapioItem = {
  id: string;
  nome: string;
  categoria: string;
  precoVenda: number;
  quantidadeVenda: number;
  descricao: string | null;
};

export default function MenuPage() {
  const [itens, setItens] = useState<CardapioItem[]>([]);
  const [loading, setLoading] = useState(true);

  const { adicionarAoCarrinho } = useClient();

  useEffect(() => {
    async function carregarCardapio() {
      try {
        const response = await fetch(
          "/api/cardapio-disponivel"
        );

        if (!response.ok) {
          throw new Error(
            "Erro ao carregar cardápio"
          );
        }

        const data: CardapioItem[] =
          await response.json();

        setItens(data);
      } finally {
        setLoading(false);
      }
    }

    carregarCardapio();
  }, []);

  function adicionarItem(item: CardapioItem) {
    adicionarAoCarrinho({
      id: item.id,
      nome: item.nome,
      preco: Number(item.precoVenda),
      quantidade: 1,
    });
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <p className="text-muted-foreground">
          Carregando cardápio...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Cardápio
        </h1>

        <p className="mt-2 text-muted-foreground">
          Escolha os produtos que deseja pedir.
        </p>
      </div>

      {itens.length === 0 ? (
        <div className="rounded-xl border p-8 text-center">
          <p className="text-muted-foreground">
            Nenhum item disponível no momento.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {itens.map((item) => (
            <div
              key={item.id}
              className="flex flex-col rounded-xl border bg-card p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {item.nome}
                  </h2>

                  <p className="mt-1 text-sm capitalize text-muted-foreground">
                    {item.categoria}
                  </p>
                </div>

                <span className="font-bold">
                  R$ {Number(item.precoVenda).toFixed(2)}
                </span>
              </div>

              {item.descricao && (
                <p className="mt-4 text-sm text-muted-foreground">
                  {item.descricao}
                </p>
              )}

              <p className="mt-4 text-sm">
                Disponível:{" "}
                <span className="font-semibold">
                  {item.quantidadeVenda}
                </span>
              </p>

              <button
                type="button"
                onClick={() => adicionarItem(item)}
                className="mt-5 w-full rounded-md bg-blue-500 px-4 py-3 font-semibold text-white transition hover:bg-blue-600"
              >
                Adicionar ao pedido
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}