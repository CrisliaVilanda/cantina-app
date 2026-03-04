import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type ComndsCardProps = {
  id: string,
  title: string,
  description: string,
  statusPayment: string[],
  price: number,
}
//lstagem de comandas | pedidos
export function ComndsListCards( {id, title, description,  statusPayment, price} : ComndsCardProps){
  return (
  //painel de pedidoscom status de "pagamento não confirmado", "pagamento realizado", "pedido para retirada"
  //outros menus: estoque de aliemtos e relatório de vendas
    <Card className="m-5">
      <CardHeader className="flex flex-wrap justify-between">
        {/*nome do cliente*/}
        <CardTitle>{title}</CardTitle> 
          {/*status do pagamento*/}
        <div>
          {statusPayment.map((p) => (
            <Badge key={p}>{p}</Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="overflow-x-hidden ml-5">
          <li>
            {description}
          </li>
      
      </CardContent>
      
      <CardFooter>
        <div className="flex justify-around space-x-10">
        <p>{price}</p>
          {/*Ver detalhes do pedido*/}
          <Button asChild>
            <Link href={`/admin/painel/commandcard/${id}`}>Ver detalhes</Link>
          </Button>
          </div>
      </CardFooter>

    </Card>
  )
}