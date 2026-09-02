import Link from "next/link";

import { prisma } from "@/lib/prisma";
import SaidaForm from "../../../../components/admin/SaidaEstoqueForm";

export default async function SaidaEstoquePage() {
  const produtos = await prisma.produto.findMany({
    where: {
      ativo: true,
      estoque: {
        isNot: null,
      },
    },
    select: {
      id: true,
      nome: true,
      unidadeMedida: true,
      estoque: {
        select: {
          quantidadeAtual: true,
        },
      },
    },
    orderBy: {
      nome: "asc",
    },
  });
  const produtosSerializados = produtos.map((produto) => ({
    id: produto.id,
    nome: produto.nome,
    unidadeMedida: produto.unidadeMedida,
    quantidadeAtual: produto.estoque
      ? Number(produto.estoque.quantidadeAtual)
      : 0,
  }));

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          href="/admin/estoque/movimentacoes"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Voltar para movimentações
        </Link>

        <h1 className="mt-4 text-3xl font-bold">
          Saída de estoque
        </h1>

        <p className="mt-1 text-muted-foreground">
          Registre o consumo, perda ou descarte de produtos.
        </p>
      </div>

      <SaidaForm produtos={produtosSerializados} />
    </div>
  );
}