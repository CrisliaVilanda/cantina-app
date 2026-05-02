import { prisma } from "@/lib/prisma";

export async function GET() {
  const itens = await prisma.estoque.findMany();

  const data = itens
    .map((item) => {
      const restante = item.quantidadeAdquirida - item.quantidadeSaidas;

      return {
        id: item.id,
        nome: item.produto,
        restante,
      };
    })
    .filter((item) => item.restante > 0);

  return Response.json(data);
}
