import { prisma } from "@/lib/prisma";

export type EstoqueItem = {
  id: string;
  produto: string;
  unidadeMedida: string;
  quantidadeAdquirida: number;
  quantidadeSaidas: number;
  preco: number;
  dataAquisicao: Date;
  quantidadeRestante: number;
};

export async function listarEstoque(): Promise<EstoqueItem[]> {
  const itens = await prisma.estoque.findMany({
    orderBy: {
      dataAquisicao: "desc",
    },
  });

  return itens.map((item) => ({
    id: item.id,
    produto: item.produto,
    unidadeMedida: item.unidadeMedida,
    quantidadeAdquirida: item.quantidadeAdquirida,
    quantidadeSaidas: item.quantidadeSaidas,

    preco: item.preco.toNumber(),

    dataAquisicao: item.dataAquisicao,
    quantidadeRestante: item.quantidadeAdquirida - item.quantidadeSaidas,
  }));
}
