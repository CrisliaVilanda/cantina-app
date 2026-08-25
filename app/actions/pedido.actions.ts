"use server";

import { prisma } from "@/lib/prisma";
import {
  FormaPagamento,
  PedidoStatus,
  Prisma,
  TipoMovimentacao,
} from "@prisma/client";

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
      const cardapioIds = [...new Set(itens.map((item) => item.cardapioId))];

      const cardapios = await tx.cardapio.findMany({
        where: {
          id: {
            in: cardapioIds,
          },
          ativo: true,
        },
        include: {
          ingredientes: {
            include: {
              produto: {
                include: {
                  movimentacoes: true,
                },
              },
            },
          },
        },
      });

      if (cardapios.length !== cardapioIds.length) {
        throw new Error("Um ou mais produtos não estão mais disponíveis.");
      }

      const itensCalculados = itens.map((item) => {
        const cardapio = cardapios.find(
          (produto) => produto.id === item.cardapioId,
        );

        if (!cardapio) {
          throw new Error("Produto do cardápio não encontrado.");
        }

        const precoUnitario = new Prisma.Decimal(cardapio.precoVenda);

        const subtotal = precoUnitario.mul(item.quantidade);

        return {
          cardapioId: cardapio.id,
          quantidade: item.quantidade,
          precoUnitario,
          subtotal,
          ingredientes: cardapio.ingredientes,
        };
      });

      const total = itensCalculados.reduce(
        (acc, item) => acc.plus(item.subtotal),
        new Prisma.Decimal(0),
      );

      // Verifica e prepara as baixas de estoque
      const baixasEstoque = new Map<
        string,
        {
          produtoId: string;
          quantidade: Prisma.Decimal;
          custoUnitario: Prisma.Decimal;
          produtoNome: string;
        }
      >();

      for (const item of itensCalculados) {
        for (const ingrediente of item.ingredientes) {
          const quantidadeNecessaria = new Prisma.Decimal(
            ingrediente.quantidade,
          ).mul(item.quantidade);

          const existente = baixasEstoque.get(ingrediente.produtoId);

          if (existente) {
            existente.quantidade =
              existente.quantidade.plus(quantidadeNecessaria);
          } else {
            const estoque = await tx.estoque.findFirst({
              where: {
                produto: ingrediente.produto.nome,
              },
            });

            if (!estoque) {
              throw new Error(
                `Estoque não encontrado para ${ingrediente.produto.nome}.`,
              );
            }

            baixasEstoque.set(ingrediente.produtoId, {
              produtoId: ingrediente.produtoId,
              quantidade: quantidadeNecessaria,
              custoUnitario: new Prisma.Decimal(estoque.custoUnitario),
              produtoNome: ingrediente.produto.nome,
            });
          }
        }
      }

      // Verifica se existe estoque suficiente
      for (const baixa of baixasEstoque.values()) {
        const estoque = await tx.estoque.findFirst({
          where: {
            produto: baixa.produtoNome,
          },
        });

        if (!estoque) {
          throw new Error(`Estoque não encontrado para ${baixa.produtoNome}.`);
        }

        const quantidadeAtual = new Prisma.Decimal(estoque.quantidadeAtual);

        if (baixa.quantidade.gt(quantidadeAtual)) {
          throw new Error(
            `Estoque insuficiente para ${baixa.produtoNome}. Disponível: ${quantidadeAtual.toString()}. Necessário: ${baixa.quantidade.toString()}.`,
          );
        }
      }

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

      // Registra as vendas
      for (const item of itensCalculados) {
        await tx.venda.create({
          data: {
            pedidoId: pedido.id,
            cardapioId: item.cardapioId,
            quantidade: item.quantidade,
            total: item.subtotal,
          },
        });
      }

      // Baixa o estoque e registra movimentação
      for (const baixa of baixasEstoque.values()) {
        const estoque = await tx.estoque.findFirst({
          where: {
            produto: baixa.produtoNome,
          },
        });

        if (!estoque) {
          throw new Error(`Estoque não encontrado para ${baixa.produtoNome}.`);
        }

        const novaQuantidade = new Prisma.Decimal(
          estoque.quantidadeAtual,
        ).minus(baixa.quantidade);

        if (novaQuantidade.lt(0)) {
          throw new Error(`Estoque insuficiente para ${baixa.produtoNome}.`);
        }

        await tx.estoque.update({
          where: {
            id: estoque.id,
          },
          data: {
            quantidadeAtual: novaQuantidade.toNumber(),
          },
        });

        await tx.movimentacaoEstoque.create({
          data: {
            produtoId: baixa.produtoId,
            tipo: TipoMovimentacao.SAIDA,
            quantidade: baixa.quantidade,
            custoUnitario: baixa.custoUnitario,
            observacao: `Saída referente ao pedido ${pedido.numero}`,
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
        (totalQuantidade, item) => totalQuantidade + item.quantidade,
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
      numeroPedido: resultado.numero,
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
