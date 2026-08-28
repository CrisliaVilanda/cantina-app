import { prisma } from "@/lib/prisma";
import EntradaEstoqueForm from "../../../../components/admin/EntradaEstoqueForm";

export default async function EntradaEstoquePage() {
  const produtosDb = await prisma.produto.findMany({
    where: {
      ativo: true,
    },
    orderBy: {
      nome: "asc",
    },
  });

  const produtos = produtosDb.map((produto) => ({
    id: produto.id,
    nome: produto.nome,
    categoria: produto.categoria,
    unidadeMedida: produto.unidadeMedida,
    estoqueMinimo: Number(produto.estoqueMinimo),
  }));

  return (
    <EntradaEstoqueForm produtos={produtos} />
  );
}