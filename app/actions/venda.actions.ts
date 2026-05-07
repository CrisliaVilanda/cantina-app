"use server";

import { prisma } from "@/lib/prisma";

export async function registrarVenda({
  cardapioId,
  quantidade,
}: {
  cardapioId: string;
  quantidade: number;
}) {
  const item = await prisma.cardapio.findUnique({
    where: {
      id: cardapioId,
    },
    include: {
      estoque: true,
    },
  });

  if (!item) {
    throw new Error("Item não encontrado");
  }

  const total = Number(item.precoVenda) * quantidade;

  // REGISTRA VENDA
  await prisma.venda.create({
    data: {
      cardapioId,
      quantidade,
      total,
    },
  });

  // BAIXA ESTOQUE
  await prisma.estoque.update({
    where: {
      id: item.estoqueId,
    },
    data: {
      quantidadeSaidas: {
        increment: quantidade,
      },
    },
  });

  // DATA DE HOJE
  const hoje = new Date();

  const dataHoje = new Date(
    hoje.getFullYear(),
    hoje.getMonth(),
    hoje.getDate(),
  );

  // ATUALIZA SALDO
  await prisma.saldoDiario.upsert({
    where: {
      data: dataHoje,
    },

    update: {
      totalVendas: {
        increment: quantidade,
      },

      totalArrecadado: {
        increment: total,
      },
    },

    create: {
      data: dataHoje,
      totalVendas: quantidade,
      totalArrecadado: total,
    },
  });
}
