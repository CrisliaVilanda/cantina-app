"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type ProdutoInput = {
  nome: string;
  categoria: string;
  unidadeMedida: string;
  estoqueMinimo: number;
};

export async function criarProduto(data: ProdutoInput) {
  const nome = data.nome.trim();
  const categoria = data.categoria.trim();
  const unidadeMedida = data.unidadeMedida.trim();

  if (!nome) {
    return {
      success: false,
      error: "Informe o nome do produto.",
    };
  }

  if (!categoria) {
    return {
      success: false,
      error: "Informe a categoria.",
    };
  }

  if (!unidadeMedida) {
    return {
      success: false,
      error: "Informe a unidade de medida.",
    };
  }

  if (data.estoqueMinimo < 0) {
    return {
      success: false,
      error: "O estoque mínimo não pode ser negativo.",
    };
  }

  try {
    const produtoExistente = await prisma.produto.findFirst({
      where: {
        nome: {
          equals: nome,
          mode: "insensitive",
        },
      },
    });

    if (produtoExistente) {
      return {
        success: false,
        error: "Já existe um produto com esse nome.",
      };
    }

    const produto = await prisma.produto.create({
      data: {
        nome,
        categoria,
        unidadeMedida,
        estoqueMinimo: data.estoqueMinimo,
      },
    });

    await prisma.estoque.create({
      data: {
        produtoId: produto.id,
        quantidadeAtual: 0,
        custoUnitario: 0,
      },
    });

    revalidatePath("/admin/estoque/produtos");

    return {
      success: true,
      produtoId: produto.id,
    };
  } catch (error) {
    console.error("Erro ao criar produto:", error);

    return {
      success: false,
      error: "Não foi possível cadastrar o produto.",
    };
  }
}

export async function atualizarProduto(id: string, data: ProdutoInput) {
  const nome = data.nome.trim();
  const categoria = data.categoria.trim();
  const unidadeMedida = data.unidadeMedida.trim();

  if (!id) {
    return {
      success: false,
      error: "Produto inválido.",
    };
  }

  if (!nome || !categoria || !unidadeMedida) {
    return {
      success: false,
      error: "Preencha todos os campos obrigatórios.",
    };
  }

  if (data.estoqueMinimo < 0) {
    return {
      success: false,
      error: "O estoque mínimo não pode ser negativo.",
    };
  }

  try {
    const produtoExistente = await prisma.produto.findFirst({
      where: {
        nome: {
          equals: nome,
          mode: "insensitive",
        },
        NOT: {
          id,
        },
      },
    });

    if (produtoExistente) {
      return {
        success: false,
        error: "Já existe outro produto com esse nome.",
      };
    }

    await prisma.produto.update({
      where: {
        id,
      },
      data: {
        nome,
        categoria,
        unidadeMedida,
        estoqueMinimo: data.estoqueMinimo,
      },
    });

    revalidatePath("/admin/estoque/produtos");
    revalidatePath(`/admin/estoque/produtos/${id}`);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);

    return {
      success: false,
      error: "Não foi possível atualizar o produto.",
    };
  }
}

export async function alternarProdutoAtivo(id: string) {
  if (!id) {
    return {
      success: false,
      error: "Produto inválido.",
    };
  }

  try {
    const produto = await prisma.produto.findUnique({
      where: {
        id,
      },
    });

    if (!produto) {
      return {
        success: false,
        error: "Produto não encontrado.",
      };
    }

    await prisma.produto.update({
      where: {
        id,
      },
      data: {
        ativo: !produto.ativo,
      },
    });

    revalidatePath("/admin/estoque/produtos");

    return {
      success: true,
      ativo: !produto.ativo,
    };
  } catch (error) {
    console.error("Erro ao alterar status do produto:", error);

    return {
      success: false,
      error: "Não foi possível alterar o status.",
    };
  }
}
