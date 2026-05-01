"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const schema = z.object({
  ProductName: z.string().min(3),
  mensurement: z.string().min(1),
  productPrice: z.string().min(1),
  quantity: z.string().min(1),
});

export async function criarItemEstoque(data: z.infer<typeof schema>) {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Dados inválidos");
  }

  const { ProductName, mensurement, productPrice, quantity } = parsed.data;

  const preco = Number(productPrice.replace("R$", "").replace(",", ".").trim());

  const quantidade = Number(quantity);

  if (isNaN(preco) || isNaN(quantidade)) {
    throw new Error("Valores inválidos");
  }

  await prisma.estoque.create({
    data: {
      produto: ProductName,
      unidadeMedida: mensurement,
      quantidadeAdquirida: quantidade,
      quantidadeSaidas: 0,
      preco: preco,
    },
  });

  revalidatePath("/admin/estoque");
  redirect("/admin/estoque");
}
