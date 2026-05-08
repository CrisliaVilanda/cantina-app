import { prisma } from "@/lib/prisma";
import RelatoriosCharts from "./RelatoriosCharts";

export default async function RelatoriosPage() {
  const vendas = await prisma.venda.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  const vendasPorDiaMap = new Map<string, number>();

  vendas.forEach((venda) => {
    const data = new Date(venda.createdAt).toLocaleDateString("pt-BR");

    vendasPorDiaMap.set(
      data,
      (vendasPorDiaMap.get(data) || 0) + Number(venda.total)
    );
  });

  const vendasPorDia = Array.from(vendasPorDiaMap.entries()).map(
    ([data, total]) => ({
      data,
      total,
    })
  );

  const categorias = await prisma.cardapio.groupBy({
    by: ["categoria"],
    _count: true,
  });

  const categoriasData = categorias.map((item) => ({
    name: item.categoria,
    value: item._count,
  }));

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Relatórios
        </h1>

        <p className="text-muted-foreground">
          Indicadores operacionais e financeiros
        </p>
      </div>

      <RelatoriosCharts
        vendasPorDia={vendasPorDia}
        categoriasData={categoriasData}
      />
    </div>
  );
}