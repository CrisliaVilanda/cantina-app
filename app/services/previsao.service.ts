import { prisma } from "@/lib/prisma";

export async function preverRupturaEstoque() {
  const estoque = await prisma.estoque.findMany();

  return estoque.map((item) => {
    const restante = item.quantidadeAdquirida - item.quantidadeSaidas;

    const mediaDiaria = item.quantidadeSaidas / 30;

    const diasRestantes = mediaDiaria > 0 ? restante / mediaDiaria : 999;

    return {
      produto: item.produto,
      restante,
      diasRestantes: Math.floor(diasRestantes),
    };
  });
}
