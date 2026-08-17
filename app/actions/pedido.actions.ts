"use server";

import { prisma } from "@/lib/prisma";
import { PedidoStatus, FormaPagamento, Prisma } from "@prisma/client";

type ItemPedidoInput = {
  cardapioId: string;
  quantidade: number;
};

type ConfirmarPedidoInput = {
  cliente: string;
  formaPagamento: FormaPagamento;
  itens: ItemPedidoInput[];
};

export async function confirmarPedido({
  cliente,
  formaPagamento,
  itens,
}: ConfirmarPedidoInput) {
  if (!cliente?.trim()) {
    return {
      success: false,
      error: "Nome do cliente não informado.",
    };
  }

  if (!formaPagamento) {
    return {
      success: false,
      error: "Forma de pagamento não informada.",
    };
  }

  if (!itens || itens.length === 0) {
    return {
      success: false,
      error: "O pedido não possui itens.",
    };
  }

  for (const item of itens) {
    if (!item.cardapioId) {
      return {
        success: false,
        error: "Item do pedido inválido.",
      };
    }

    if (!Number.isInteger(item.quantidade) || item.quantidade <= 0) {
      return {
        success: false,
        error: "Quantidade inválida.",
      };
    }
  }

  try {
    const resultado = await prisma.$transaction(async (tx) => {
      const cardapioIds = itens.map((item) => item.cardapioId);

      const cardapios = await tx.cardapio.findMany({
        where: {
          id: {
            in: cardapioIds,
          },
          ativo: true,
        },
        include: {
          estoque: true,
        },
      });

      if (cardapios.length !== cardapioIds.length) {
        throw new Error("Um ou mais produtos não estão mais disponíveis.");
      }

      const itensCalculados = itens.map((item) => {
        const produto = cardapios.find(
          (cardapio) => cardapio.id === item.cardapioId,
        );

        if (!produto) {
          throw new Error("Produto não encontrado.");
        }

        const restante =
          produto.estoque.quantidadeAdquirida -
          produto.estoque.quantidadeSaidas;

        if (item.quantidade > restante) {
          throw new Error(
            `Estoque insuficiente para ${produto.nome}. Restam ${restante} unidades.`,
          );
        }

        const precoUnitario = new Prisma.Decimal(produto.precoVenda);

        const subtotal = precoUnitario.mul(item.quantidade);

        return {
          cardapioId: produto.id,
          quantidade: item.quantidade,
          precoUnitario,
          subtotal,
          estoqueId: produto.estoqueId,
        };
      });

      const total = itensCalculados.reduce(
        (acc, item) => acc.plus(item.subtotal),
        new Prisma.Decimal(0),
      );

      // Cria o pedido
      const pedido = await tx.pedido.create({
        data: {
          cliente: cliente.trim(),
          status: PedidoStatus.PENDENTE,
          formaPagamento,
          total,
        },
      });

      // Cria os itens do pedido
      await tx.pedidoItem.createMany({
        data: itensCalculados.map((item) => ({
          pedidoId: pedido.id,
          cardapioId: item.cardapioId,
          quantidade: item.quantidade,
          precoUnitario: item.precoUnitario,
          subtotal: item.subtotal,
        })),
      });

      // Registra as vendas e baixa o estoque
      for (const item of itensCalculados) {
        await tx.venda.create({
          data: {
            pedidoId: pedido.id,
            cardapioId: item.cardapioId,
            quantidade: item.quantidade,
            total: item.subtotal,
          },
        });

        const estoqueAtual = await tx.estoque.findUnique({
          where: {
            id: item.estoqueId,
          },
        });

        if (!estoqueAtual) {
          throw new Error("Estoque do produto não encontrado.");
        }

        const restante =
          estoqueAtual.quantidadeAdquirida - estoqueAtual.quantidadeSaidas;

        if (item.quantidade > restante) {
          throw new Error("Estoque insuficiente para finalizar o pedido.");
        }

        await tx.estoque.update({
          where: {
            id: item.estoqueId,
          },
          data: {
            quantidadeSaidas: {
              increment: item.quantidade,
            },
          },
        });
      }

      // Atualiza o saldo diário
      const agora = new Date();

      const inicioDia = new Date(
        agora.getFullYear(),
        agora.getMonth(),
        agora.getDate(),
      );

      const quantidadeVendida = itensCalculados.reduce(
        (total, item) => total + item.quantidade,
        0,
      );

      await tx.saldoDiario.upsert({
        where: {
          data: inicioDia,
        },

        update: {
          totalVendas: {
            increment: quantidadeVendida,
          },

          totalArrecadado: {
            increment: total,
          },
        },

        create: {
          data: inicioDia,
          totalVendas: quantidadeVendida,
          totalArrecadado: total,
        },
      });

      return pedido;
    });

    return {
      success: true,
      pedidoId: resultado.id,
    };
  } catch (error) {
    console.error("Erro ao confirmar pedido:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Não foi possível confirmar o pedido.",
    };
  }
}
