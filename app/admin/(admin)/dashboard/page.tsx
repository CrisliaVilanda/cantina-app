import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const hoje = new Date();

  const inicioDia = new Date(
    hoje.getFullYear(),
    hoje.getMonth(),
    hoje.getDate()
  );

  const inicioMes = new Date(
    hoje.getFullYear(),
    hoje.getMonth(),
    1
  );

  // 🔥 VENDAS DO DIA
  const vendasHoje = await prisma.venda.findMany({
    where: {
      createdAt: {
        gte: inicioDia,
      },
    },
  });

  // 🔥 VENDAS DO MÊS
  const vendasMes = await prisma.venda.findMany({
    where: {
      createdAt: {
        gte: inicioMes,
      },
    },
  });

  // 💰 TOTAL ARRECADADO
  const totalHoje = vendasHoje.reduce(
    (acc, venda) => acc + Number(venda.total),
    0
  );

  const totalMes = vendasMes.reduce(
    (acc, venda) => acc + Number(venda.total),
    0
  );

  // ⚠️ ALERTA ESTOQUE
  const estoque = await prisma.estoque.findMany();

  const alertas = estoque.filter((item) => {
    const restante =
      item.quantidadeAdquirida - item.quantidadeSaidas;

    return restante <= 5;
  });

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <h1 className="text-3xl font-semibold">Dashboard</h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* VENDAS HOJE */}
        <Card title="Vendas Hoje">
          {vendasHoje.length}
        </Card>

        {/* FATURAMENTO HOJE */}
        <Card title="Faturamento Hoje">
          R$ {totalHoje.toFixed(2)}
        </Card>

        {/* VENDAS MÊS */}
        <Card title="Vendas no Mês">
          {vendasMes.length}
        </Card>

        {/* FATURAMENTO MÊS */}
        <Card title="Faturamento Mensal">
          R$ {totalMes.toFixed(2)}
        </Card>

      </div>

      {/* ALERTA ESTOQUE */}
      <div className="bg-red-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">
          ⚠️ Estoque baixo
        </h2>

        {alertas.length === 0 ? (
          <p className="text-gray-600">
            Nenhum item com estoque baixo
          </p>
        ) : (
          <ul className="space-y-2">
            {alertas.map((item) => {
              const restante =
                item.quantidadeAdquirida -
                item.quantidadeSaidas;

              return (
                <li key={item.id} className="text-red-700">
                  {item.produto} → restam {restante} unidades
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

/* COMPONENTE CARD */
function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{children}</h2>
    </div>
  );
}