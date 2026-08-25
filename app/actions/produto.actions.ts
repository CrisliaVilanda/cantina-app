"use server";

import { prisma } from "@/lib/prisma";

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
