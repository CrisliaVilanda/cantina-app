"use server";

import { prisma } from "@/lib/prisma";
import { TipoMovimentacao, Prisma } from "@prisma/client";

type CriarEntradaInput = {
  produtoId: string;
  quantidade: number;
  custoUnitario: number;
  observacao?: string;
};

export async function criarEntradaEstoque({
  produtoId,
  quantidade,
  custoUnitario,
  observacao,
}: CriarEntradaInput) {
  if (!produtoId) {
    return {
      success: false,
      error: "Selecione um produto.",
    };
  }

  if (!Number.isFinite(quantidade) || quantidade <= 0) {
    return {
      success: false,
      error: "A quantidade deve ser maior que zero.",
    };
  }

  if (!Number.isFinite(custoUnitario) || custoUnitario < 0) {
    return {
      success: false,
      error: "Informe um custo unitário válido.",
    };
  }

  try {
    const resultado = await prisma.$transaction(async (tx) => {
      const produto = await tx.produto.findUnique({
        where: {
          id: produtoId,
        },
        include: {
          estoque: true,
        },
      });

      if (!produto) {
        throw new Error("Produto não encontrado.");
      }

      if (!produto.ativo) {
        throw new Error("Não é possível movimentar um produto inativo.");
      }

      const quantidadeDecimal = new Prisma.Decimal(quantidade);
      const custoDecimal = new Prisma.Decimal(custoUnitario);

      let estoque;

      if (produto.estoque) {
        estoque = await tx.estoque.update({
          where: {
            id: produto.estoque.id,
          },
          data: {
            quantidadeAtual: {
              increment: quantidadeDecimal,
            },
            custoUnitario: custoDecimal,
          },
        });
      } else {
        estoque = await tx.estoque.create({
          data: {
            produtoId: produto.id,
            quantidadeAtual: quantidadeDecimal,
            custoUnitario: custoDecimal,
          },
        });
      }

      const movimentacao = await tx.movimentacaoEstoque.create({
        data: {
          produtoId: produto.id,
          tipo: TipoMovimentacao.ENTRADA,
          quantidade: quantidadeDecimal,
          custoUnitario: custoDecimal,
          observacao: observacao?.trim() || null,
        },
      });

      return {
        estoque,
        movimentacao,
      };
    });

    return {
      success: true,
      estoqueId: resultado.estoque.id,
      movimentacaoId: resultado.movimentacao.id,
    };
  } catch (error) {
    console.error("Erro ao registrar entrada de estoque:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Não foi possível registrar a entrada de estoque.",
    };
  }
}
