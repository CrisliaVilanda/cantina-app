import { prisma } from "@/lib/prisma";

export async function listarEstoqueDisponivel() {
  const itens = await prisma.estoque.findMany();

  return itens
    .map((item) => {
      const restante = item.quantidadeAdquirida - item.quantidadeSaidas;

      return {
        id: item.id,
        nome: item.produto,
        restante,
      };
    })
    .filter((item) => item.restante > 0);
}
