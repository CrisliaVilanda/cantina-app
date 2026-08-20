import { prisma } from "@/lib/prisma";
import { ComndsListCards } from "../../../components/admin/ComndsListCards";

export default async function CommandPainel() {
  const pedidos = await prisma.pedido.findMany({
    include: {
      itens: {
        include: {
          cardapio: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col px-4 py-8">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Painel de pedidos
        </h1>

        <p className="text-muted-foreground">
          Gerencie os pedidos realizados
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {pedidos.length === 0 ? (
          <div className="col-span-full bg-card border border-border rounded-xl p-8 text-center">
            <p className="text-muted-foreground">
              Nenhum pedido encontrado
            </p>
          </div>
        ) : (
          pedidos.map((pedido) => (
            <ComndsListCards
              key={pedido.id}
              id={pedido.id}
              title={pedido.cliente}
              description={
                pedido.itens.length > 0
                  ? pedido.itens
                    .map((item) => item.cardapio.nome)
                    .join(", ")
                  : "Nenhum item"
              }
              statusPayment={[pedido.status]}
              price={Number(pedido.total)}
            />
          ))
        )}
      </div>
    </div>
  );
}