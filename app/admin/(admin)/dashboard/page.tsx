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

  // SALDO DO DIA
  const saldoHoje = await prisma.saldoDiario.findFirst({
    where: {
      data: inicioDia,
    },
  });

  // SALDOS DO MÊS
  const saldosMes = await prisma.saldoDiario.findMany({
    where: {
      data: {
        gte: inicioMes,
      },
    },
  });

  // SOMA DO MÊS
  const faturamentoMes = saldosMes.reduce<number>(
    (acc, item) => acc + Number(item.totalArrecadado),
    0
  );

  const vendasMes = saldosMes.reduce<number>(
    (acc, item) => acc + item.totalVendas,
    0
  );

  // ALERTAS ESTOQUE
  const estoque = await prisma.estoque.findMany();

  const alertas = estoque.filter((item) => {
    const restante =
      item.quantidadeAdquirida -
      item.quantidadeSaidas;

    return restante <= 5;
  });

  return (
    <div className="p-6 space-y-6 bg-background text-foreground min-h-screen">

      <h1 className="text-3xl font-semibold text-foreground">
        Dashboard
      </h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <Card title="Vendas Hoje">
          {saldoHoje?.totalVendas ?? 0}
        </Card>

        <Card title="Faturamento Hoje">
          R$ {Number(
            saldoHoje?.totalArrecadado ?? 0
          ).toFixed(2)}
        </Card>

        <Card title="Vendas no Mês">
          {vendasMes}
        </Card>

        <Card title="Faturamento Mensal">
          R$ {faturamentoMes.toFixed(2)}
        </Card>

      </div>

      {/* ALERTAS */}
      <div className="bg-red-100/40 dark:bg-red-950/30 border border-red-300 dark:border-red-800 rounded-lg p-6">

        <h2 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-4">
          Estoque baixo
        </h2>

        {alertas.length === 0 ? (
          <p className="text-muted-foreground">
            Nenhum item com estoque baixo
          </p>
        ) : (
          <div className="space-y-2">
            {alertas.map((item) => {

              const restante =
                item.quantidadeAdquirida -
                item.quantidadeSaidas;

              return (
                <div
                  key={item.id}
                  className="flex justify-between bg-background border border-border p-3 rounded-lg"
                >
                  <span>{item.produto}</span>

                  <span className="font-semibold text-red-600 dark:text-red-400">
                    {restante} restantes
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card text-card-foreground border border-border shadow-sm rounded-xl p-5">

      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2 text-foreground">
        {children}
      </h2>
    </div>
  );
}