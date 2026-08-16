"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type ItemPedidoInput = {
  cardapioId: string;
  quantidade: number;
};

export async function criarPedido({
  cliente,
  itens,
}: {
  cliente: string;
  itens: ItemPedidoInput[];
}) {
  if (!cliente.trim()) {
    throw new Error("Nome do cliente é obrigatório");
  }

  if (!itens.length) {
    throw new Error("O pedido precisa ter pelo menos um item");
  }

  return await prisma.$transaction(async (tx) => {
    const cardapioIds = itens.map((item) => item.cardapioId);

    const cardapios = await tx.cardapio.findMany({
      where: {
        id: {
          in: cardapioIds,
        },
        ativo: true,
      },
    });

    if (cardapios.length !== new Set(cardapioIds).size) {
      throw new Error("Um ou mais itens do cardápio não estão disponíveis");
    }

    const itensPedido = itens.map((item) => {
      const cardapio = cardapios.find(
        (produto) => produto.id === item.cardapioId,
      );

      if (!cardapio) {
        throw new Error("Item do cardápio não encontrado");
      }

      if (item.quantidade <= 0) {
        throw new Error("A quantidade deve ser maior que zero");
      }

      const precoUnitario = cardapio.precoVenda;

      const subtotal = precoUnitario.mul(item.quantidade);

      return {
        cardapioId: cardapio.id,
        quantidade: item.quantidade,
        precoUnitario,
        subtotal,
      };
    });

    const total = itensPedido.reduce(
      (acc, item) => acc.add(item.subtotal),
      new Prisma.Decimal(0),
    );

    const pedido = await tx.pedido.create({
      data: {
        cliente: cliente.trim(),
        status: "PENDENTE",
        total,

        itens: {
          create: itensPedido,
        },
      },

      include: {
        itens: {
          include: {
            cardapio: true,
          },
        },
      },
    });

    return pedido;
  });
}

export async function confirmarPedido({
  cliente,
  itens,
}: {
  cliente: string;
  itens: ItemPedidoInput[];
}): Promise<{ success: boolean; pedidoId?: string; error?: string }> {
  try {
    const pedido = await criarPedido({ cliente, itens });

    revalidatePath("/carrinho");

    return {
      success: true,
      pedidoId: pedido.id,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro ao confirmar pedido",
    };
  }
}
