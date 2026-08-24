// regra de cálculo do estoque.

import { prisma } from "@/lib/prisma";
import { TipoMovimentacao } from "@prisma/client";

export async function obterEstoqueAtual(produtoId: string) {
  const movimentacoes = await prisma.movimentacaoEstoque.findMany({
    where: {
      produtoId,
    },
    select: {
      tipo: true,
      quantidade: true,
    },
  });

  let estoqueAtual = 0;

  for (const movimentacao of movimentacoes) {
    const quantidade = Number(movimentacao.quantidade);

    if (movimentacao.tipo === TipoMovimentacao.ENTRADA) {
      estoqueAtual += quantidade;
    }

    if (movimentacao.tipo === TipoMovimentacao.SAIDA) {
      estoqueAtual -= quantidade;
    }

    if (movimentacao.tipo === TipoMovimentacao.AJUSTE) {
      estoqueAtual += quantidade;
    }
  }

  return estoqueAtual;
}

export async function obterProdutosComEstoque() {
  const produtos = await prisma.produto.findMany({
    where: {
      ativo: true,
    },
    orderBy: {
      nome: "asc",
    },
    include: {
      movimentacoes: {
        select: {
          tipo: true,
          quantidade: true,
        },
      },
    },
  });

  return produtos.map((produto) => {
    let estoqueAtual = 0;

    for (const movimentacao of produto.movimentacoes) {
      const quantidade = Number(movimentacao.quantidade);

      if (movimentacao.tipo === TipoMovimentacao.ENTRADA) {
        estoqueAtual += quantidade;
      }

      if (movimentacao.tipo === TipoMovimentacao.SAIDA) {
        estoqueAtual -= quantidade;
      }

      if (movimentacao.tipo === TipoMovimentacao.AJUSTE) {
        estoqueAtual += quantidade;
      }
    }

    const estoqueMinimo = Number(produto.estoqueMinimo);

    return {
      ...produto,
      estoqueAtual,
      estoqueMinimo,
      estoqueBaixo: estoqueAtual <= estoqueMinimo,
    };
  });
}
