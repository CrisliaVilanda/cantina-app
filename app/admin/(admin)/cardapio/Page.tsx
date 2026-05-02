import BotaoDeAcao from "@/app/components/BotaoDeLink";
import { prisma } from "@/lib/prisma";

type CardapioItem = {
  id: string;
  nome: string;
  precoVenda: number;
  quantidadeVenda: number;
  ativo: boolean;
  produtoEstoque: string;
};

function numeroSeguro(valor: number | null | undefined): number {
  if (typeof valor !== "number" || isNaN(valor)) return 0;
  return valor;
}

function formatarMoeda(valor: number | null | undefined): string {
  const numero = numeroSeguro(valor);

  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default async function CardapioPage() {
  let itens: CardapioItem[] = [];
  let erro = false;

  try {
    const response = await prisma.cardapio.findMany({
      include: {
        estoque: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    itens = response.map((item) => ({
      id: item.id,
      nome: item.nome || "—",
      precoVenda: Number(item.precoVenda),
      quantidadeVenda: item.quantidadeVenda ?? 0,
      ativo: item.ativo,
      produtoEstoque: item.estoque?.produto || "—",
    }));
  } catch (e) {
    console.error("Erro ao buscar cardápio:", e);
    erro = true;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Cardápio</h1>
          <h3 className="text-xl font-light">
            Gerenciar itens do cardápio
          </h3>
        </div>

        <BotaoDeAcao
          textoBotao="Adicionar item ao cardápio"
          linkBotao="/admin/cardapio/new"
        />
      </div>

      {/* ERRO */}
      {erro && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          Erro ao carregar os itens do cardápio.
        </div>
      )}

      {/* TABELA */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-100 rounded-lg">
          <thead className="bg-blue-800 text-white text-left">
            <tr>
              <th className="p-3">Produto</th>
              <th className="p-3">Origem (Estoque)</th>
              <th className="p-3">Preço</th>
              <th className="p-3">Qtd disponível</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {!erro && itens.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  Nenhum item cadastrado
                </td>
              </tr>
            )}

            {!erro &&
              itens.map((item) => {
                const quantidade = numeroSeguro(
                  item.quantidadeVenda
                );

                return (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium">
                      {item.nome}
                    </td>

                    <td className="p-3 text-gray-600">
                      {item.produtoEstoque}
                    </td>

                    <td className="p-3">
                      {formatarMoeda(item.precoVenda)}
                    </td>

                    <td className="p-3">{quantidade}</td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-sm font-medium ${item.ativo
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                          }`}
                      >
                        {item.ativo ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}