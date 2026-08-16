import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const itens = await prisma.cardapio.findMany({
      where: {
        ativo: true,
        quantidadeVenda: {
          gt: 0,
        },
      },
      orderBy: {
        nome: "asc",
      },
    });

    const resultado = itens.map((item) => ({
      id: item.id,
      nome: item.nome,
      categoria: item.categoria,
      precoVenda: Number(item.precoVenda),
      quantidadeVenda: item.quantidadeVenda,
      descricao: item.descricao,
    }));

    return NextResponse.json(resultado);
  } catch {
    return NextResponse.json(
      {
        error: "Erro ao carregar cardápio",
      },
      {
        status: 500,
      },
    );
  }
}