"use server";

import { prisma } from "@/lib/prisma";

export async function criarProduto({
  nome,
  categoria,
  unidadeMedida,
  estoqueMinimo,
}: {
  nome: string;
  categoria: string;
  unidadeMedida: string;
  estoqueMinimo: number;
}) {
  try {
    const nomeLimpo = nome.trim();
    const categoriaLimpa = categoria.trim();
    const unidadeLimpa = unidadeMedida.trim();

    if (!nomeLimpo) {
      return {
        success: false,
        error: "Informe o nome do produto.",
      };
    }

    if (!categoriaLimpa) {
      return {
        success: false,
        error: "Informe a categoria do produto.",
      };
    }

    if (!unidadeLimpa) {
      return {
        success: false,
        error: "Informe a unidade de medida.",
      };
    }

    if (!Number.isFinite(estoqueMinimo) || estoqueMinimo < 0) {
      return {
        success: false,
        error: "O estoque mínimo deve ser maior ou igual a zero.",
      };
    }

    const produtoExistente = await prisma.produto.findFirst({
      where: {
        nome: {
          equals: nomeLimpo,
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

    await prisma.produto.create({
      data: {
        nome: nomeLimpo,
        categoria: categoriaLimpa,
        unidadeMedida: unidadeLimpa,
        estoqueMinimo,
      },
    });

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error("Erro ao criar produto:", error);

    return {
      success: false,
      error: "Não foi possível cadastrar o produto.",
    };
  }
}

export async function atualizarProduto(id: string, formData: FormData) {
  const nome = String(formData.get("nome") ?? "").trim();
  const categoria = String(formData.get("categoria") ?? "").trim();
  const unidadeMedida = String(formData.get("unidadeMedida") ?? "").trim();

  const estoqueMinimoTexto = String(formData.get("estoqueMinimo") ?? "").trim();

  const ativo = formData.get("ativo") === "true";

  if (!id) {
    throw new Error("Produto não informado.");
  }

  if (!nome) {
    throw new Error("Informe o nome do produto.");
  }

  if (!categoria) {
    throw new Error("Informe a categoria do produto.");
  }

  if (!unidadeMedida) {
    throw new Error("Informe a unidade de medida.");
  }

  if (!estoqueMinimoTexto) {
    throw new Error("Informe o estoque mínimo.");
  }

  const estoqueMinimo = Number(estoqueMinimoTexto.replace(",", "."));

  if (!Number.isFinite(estoqueMinimo) || estoqueMinimo < 0) {
    throw new Error(
      "O estoque mínimo deve ser um número maior ou igual a zero.",
    );
  }

  const produto = await prisma.produto.findUnique({
    where: {
      id,
    },
  });

  if (!produto) {
    throw new Error("Produto não encontrado.");
  }

  await prisma.produto.update({
    where: {
      id,
    },
    data: {
      nome,
      categoria,
      unidadeMedida,
      estoqueMinimo,
      ativo,
    },
  });
}

export async function alternarProdutoAtivo(id: string) {
  if (!id) {
    return {
      success: false,
      error: "Produto não informado.",
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

    const produtoAtualizado = await prisma.produto.update({
      where: {
        id,
      },
      data: {
        ativo: !produto.ativo,
      },
    });

    return {
      success: true,
      ativo: produtoAtualizado.ativo,
      error: null,
    };
  } catch (error) {
    console.error("Erro ao alterar status do produto:", error);

    return {
      success: false,
      error: "Não foi possível alterar o status do produto.",
    };
  }
}
