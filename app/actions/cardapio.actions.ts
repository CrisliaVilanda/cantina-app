"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const schema = z.object({
  estoqueId: z.string(),
  categoria: z.string(),
  itemDescription: z.string(),
  precoVenda: z.string(),
  quantidadeVenda: z.string(),
  ativo: z.string(),
});

export async function criarItemCardapio(data: z.infer<typeof schema>) {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Dados inválidos");
  }

  const {
    estoqueId,
    categoria,
    itemDescription,
    precoVenda,
    quantidadeVenda,
    ativo,
  } = parsed.data;

  const preco = parseFloat(precoVenda.replace("R$", "").replace(",", "."));

  const quantidade = Number(quantidadeVenda);

  const estoque = await prisma.estoque.findUnique({
    where: { id: estoqueId },
  });

  if (!estoque) throw new Error("Estoque não encontrado");

  const restante = estoque.quantidadeAdquirida - estoque.quantidadeSaidas;

  if (quantidade > restante) {
    throw new Error("Quantidade maior que estoque disponível");
  }

  await prisma.cardapio.create({
    data: {
      estoqueId,
      nome: estoque.produto,

      descricao: itemDescription,
      categoria: categoria,

      precoVenda: preco,
      quantidadeVenda: quantidade,
      ativo: ativo === "sim",
    },
  });

  revalidatePath("/admin/cardapio");
  redirect("/admin/cardapio");
}
