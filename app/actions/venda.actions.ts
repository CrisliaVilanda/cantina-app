"use server";

import { prisma } from "@/lib/prisma";

type RegistrarVendaProps = {
  cardapioId: string;
  quantidade: number;
  cliente: string;
};

export async function registrarVenda({
  cardapioId,
  quantidade,
  cliente,
}: RegistrarVendaProps) {
  // BUSCA ITEM DO CARDÁPIO
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

  // VALIDA ESTOQUE
  const restante =
    item.estoque.quantidadeAdquirida - item.estoque.quantidadeSaidas;

  if (quantidade > restante) {
    throw new Error("Estoque insuficiente");
  }

  // TOTAL DA VENDA
  const total = Number(item.precoVenda) * quantidade;

  // CRIA PEDIDO
  const pedido = await prisma.pedido.create({
    data: {
      cliente,
      status: "pendente",
      total,
    },
  });

  // REGISTRA VENDA
  await prisma.venda.create({
    data: {
      pedidoId: pedido.id,
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

  // DATA DO DIA
  const hoje = new Date();

  const dataHoje = new Date(
    hoje.getFullYear(),
    hoje.getMonth(),
    hoje.getDate(),
  );

  // ATUALIZA SALDO DIÁRIO
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

  return {
    success: true,
    pedidoId: pedido.id,
  };
}
