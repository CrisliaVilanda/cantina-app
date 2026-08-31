"use server";

import { prisma } from "@/lib/prisma";
import { Prisma, TipoMovimentacao } from "@prisma/client";

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
  const produtoIdLimpo = produtoId.trim();
  const observacaoLimpa = observacao?.trim() || null;

  if (!produtoIdLimpo) {
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
    const quantidadeDecimal = new Prisma.Decimal(quantidade);
    const custoDecimal = new Prisma.Decimal(custoUnitario);

    const resultado = await prisma.$transaction(async (tx) => {
      const produto = await tx.produto.findUnique({
        where: {
          id: produtoIdLimpo,
        },
        select: {
          id: true,
          ativo: true,
          estoque: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!produto) {
        throw new Error("Produto não encontrado.");
      }

      if (!produto.ativo) {
        throw new Error("Não é possível movimentar um produto inativo.");
      }

      let estoqueId: string;

      if (produto.estoque) {
        await tx.estoque.update({
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

        estoqueId = produto.estoque.id;
      } else {
        const estoque = await tx.estoque.create({
          data: {
            produtoId: produto.id,
            quantidadeAtual: quantidadeDecimal,
            custoUnitario: custoDecimal,
          },
          select: {
            id: true,
          },
        });

        estoqueId = estoque.id;
      }

      const movimentacao = await tx.movimentacaoEstoque.create({
        data: {
          produtoId: produto.id,
          tipo: TipoMovimentacao.ENTRADA,
          quantidade: quantidadeDecimal,
          custoUnitario: custoDecimal,
          observacao: observacaoLimpa,
        },
        select: {
          id: true,
        },
      });

      return {
        estoqueId,
        movimentacaoId: movimentacao.id,
      };
    });

    return {
      success: true,
      ...resultado,
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
