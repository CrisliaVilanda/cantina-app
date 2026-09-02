"use server";

import { prisma } from "@/lib/prisma";
import { TipoMovimentacao, Prisma } from "@prisma/client";

type CriarSaidaInput = {
  produtoId: string;
  quantidade: number;
  observacao?: string;
};

export async function criarSaidaEstoque({
  produtoId,
  quantidade,
  observacao,
}: CriarSaidaInput) {
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
        throw new Error(
          "Não é possível movimentar um produto inativo.",
        );
      }

      if (!produto.estoque) {
        throw new Error(
          "Este produto ainda não possui estoque registrado.",
        );
      }

      const quantidadeDecimal = new Prisma.Decimal(quantidade);

      const estoqueAtual = new Prisma.Decimal(
        produto.estoque.quantidadeAtual,
      );

      if (quantidadeDecimal.greaterThan(estoqueAtual)) {
        throw new Error(
          `Estoque insuficiente. Disponível: ${estoqueAtual.toFixed(3)} ${produto.unidadeMedida}.`,
        );
      }

      const novaQuantidade = estoqueAtual.minus(
        quantidadeDecimal,
      );

      const estoque = await tx.estoque.update({
        where: {
          id: produto.estoque.id,
        },
        data: {
          quantidadeAtual: novaQuantidade,
        },
      });

      const movimentacao =
        await tx.movimentacaoEstoque.create({
          data: {
            produtoId: produto.id,
            tipo: TipoMovimentacao.SAIDA,
            quantidade: quantidadeDecimal,
            observacao:
              observacao?.trim() || null,
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
    console.error(
      "Erro ao registrar saída de estoque:",
      error,
    );

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Não foi possível registrar a saída de estoque.",
    };
  }
}