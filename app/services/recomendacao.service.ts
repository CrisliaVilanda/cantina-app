import { prisma } from "@/lib/prisma";

export async function gerarRecomendacaoCompra() {
  const estoque = await prisma.estoque.findMany();

  return estoque
    .map((item) => {
      const restante = item.quantidadeAdquirida - item.quantidadeSaidas;

      const mediaMensal = item.quantidadeSaidas;

      const sugestao = mediaMensal - restante;

      return {
        produto: item.produto,
        comprar: sugestao > 0 ? sugestao : 0,
      };
    })
    .filter((item) => item.comprar > 0);
}
