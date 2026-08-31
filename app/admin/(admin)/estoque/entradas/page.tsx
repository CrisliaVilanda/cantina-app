import Link from "next/link";

import { prisma } from "@/lib/prisma";
import EntradaForm from "../../../../components/admin/EntradaEstoqueForm";


export default async function EntradaEstoquePage() {
  const produtos = await prisma.produto.findMany({
    where: {
      ativo: true,
    },
    select: {
      id: true,
      nome: true,
      unidadeMedida: true,
    },
    orderBy: {
      nome: "asc",
    },
  });

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
          Entrada de estoque
        </h1>

        <p className="mt-1 text-muted-foreground">
          Registre a entrada de produtos na cantina.
        </p>
      </div>

      <EntradaForm produtos={produtos} />
    </div>
  );
}