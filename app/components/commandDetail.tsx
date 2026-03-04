import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { subtle } from "crypto";
import { title } from "process";

interface CommandItem {
  id: string,
  title: string, 
  description: {
    title: string;
    subtitle?: string;
  }[]
  statusPayment: string[], 
  price: number, 
};
// busca simulação
const item = {
   id:"1",
   title:"Cliente 01",
   description:[
    {
      title:"sanduíche",
      subtitle: "queijo com presunto e requeijão",
  },
  {
    title: "suco de cajá",
    subtitle: "com açúcar"
  }
   ],
   statusPayment:["pagameto pendente"],
    price:10.00,
};

type CommandDetailProps = {
  id: string;
};

export default function CommandDetail ({id} : CommandDetailProps) {
  return(
    <div className="container mx-auto px-4 mt-10">
      <h1 className="text-3xl font-bold">Detalhes do pedido de {item.title}</h1>
      <div className="my-10">
        <h3 className="text-2xl font-semibold">Itens do pedido</h3>
      <div className="bg-gray-100 text-black h-[300] md:h-[400] rounded-2xl p-2 flex-wrap">
        <div className="grid grid-cols-2 mt-2">
           <div>
            <ul className="mx-3">
              {item.description.map((itm, index) => (
                <li key={index}>
                  <p className="font-semibold text-xl">{itm.title}</p>
                  {itm.subtitle && (
                    <p className="ml-4 text-base">{itm.subtitle}</p>
                  )}
                  </li>
              ))}
            </ul>
       </div>
        <div className="ml-auto justify-end">
             <Badge className="font-semibold text-1xl bg-orange-500 text-white">Pagamento pendente</Badge>
        </div>
        </div>
        <div>
         <div className="h-px bg-gray-900 mx-5 mt-5"></div>
          <div className="p-5 flex justify-start">
            <p className="font-bold text-lg">R$ {item.price}</p>
         </div>
         </div>
      </div>
        <Button asChild variant="ghost">
            <Link href="/admin" className="bg-blue-500 focus:bg-blue-700 text-white py-3 px-4 rounded-bl-sm self-center my-10 p-5">
              Retornar ao painel de pedidos
            </Link>
        </Button>
      </div>
    </div>
  )
}


//  <ul className="mx-3">
//                   <li>{itm[0]}</li>
//                   <li className="mx-2">Queijo com presunto e requeijão</li>
//                 </ul>
//               <ul className="mx-3">
//                 <li>suco de cajá</li>
//                 <li className="mx-2">Com açúcar</li>
//               </ul> 