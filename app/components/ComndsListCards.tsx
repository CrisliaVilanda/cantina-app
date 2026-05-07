type Props = {
  id: string;
  title: string;
  description: string;
  statusPayment: string[];
  price: number;
};

export function ComndsListCards({
  title,
  description,
  statusPayment,
  price,
}: Props) {

  const status = statusPayment[0]?.toLowerCase();

  function getStatusColor() {
    switch (status) {
      case "pendente":
        return "bg-orange-500";

      case "preparo":
        return "bg-blue-500";

      case "pronto":
        return "bg-green-500";

      case "pago":
        return "bg-emerald-500";

      case "cancelado":
        return "bg-red-500";

      default:
        return "bg-gray-500";
    }
  }

  function getStatusText() {
    switch (status) {
      case "pendente":
        return "Pendente";

      case "preparo":
        return "Em preparo";

      case "pronto":
        return "Pronto";

      case "pago":
        return "Pago";

      case "cancelado":
        return "Cancelado";

      default:
        return "Desconhecido";
    }
  }

  return (
    <div className="bg-background border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-all">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">

        <div>
          <h3 className="font-semibold text-lg">
            {title}
          </h3>

          <p className="text-sm text-muted-foreground">
            Pedido do cliente
          </p>
        </div>

        <div className="flex items-center gap-2">

          <div
            className={`w-3 h-3 rounded-full ${getStatusColor()}`}
          />

          <span className="text-sm font-medium">
            {getStatusText()}
          </span>
        </div>
      </div>

      {/* ITENS */}
      <div className="bg-muted/40 rounded-lg p-3 mb-4">

        <p className="text-sm font-medium mb-2">
          Itens do pedido
        </p>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center border-t border-border pt-3">

        <span className="text-sm text-muted-foreground">
          Total do pedido
        </span>

        <span className="font-bold text-xl text-green-600 dark:text-green-400">
          R$ {price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}