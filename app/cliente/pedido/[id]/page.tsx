import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PedidoPage({
  params,
}: Props) {
  const { id } = await params;

  const pedido = await prisma.pedido.findUnique({
    where: {
      id,
    },
    include: {
      itens: {
        include: {
          cardapio: true,
        },
      },
    },
  });

  if (!pedido) {
    notFound();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center">
      <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
          ✓
        </div>

        <h1 className="mt-6 text-3xl font-bold">
          Pedido realizado!
        </h1>

        <p className="mt-3 text-muted-foreground">
          Obrigado, {pedido.cliente}.
        </p>

        <div className="mt-8 rounded-xl bg-muted p-5 text-left">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Pedido
            </span>

            <span className="font-semibold">
              #{pedido.id.slice(0, 8)}
            </span>
          </div>

          <div className="mt-4 flex justify-between">
            <span className="text-muted-foreground">
              Status
            </span>

            <span className="font-semibold capitalize">
              {pedido.status}
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-3 text-left">
          {pedido.itens.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b pb-3"
            >
              <div>
                <p className="font-medium">
                  {item.cardapio.nome}
                </p>

                <p className="text-sm text-muted-foreground">
                  {item.quantidade}x R${" "}
                  {Number(item.precoUnitario).toFixed(2)} cada
                </p>
              </div>

              <span className="font-semibold">
                R${" "}
                {(
                  Number(item.precoUnitario) *
                  item.quantidade
                ).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between text-lg font-bold">
          <span>Total</span>

          <span>
            R$ {Number(pedido.total).toFixed(2)}
          </span>
        </div>

        <Link
          href="/cliente/menu"
          className="mt-8 block rounded-md bg-blue-500 px-4 py-3 font-semibold text-white hover:bg-blue-600"
        >
          Fazer outro pedido
        </Link>
      </div>
    </div>
  );
}