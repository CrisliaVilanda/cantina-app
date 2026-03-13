
// import { CommandsList } from "../components/CommandsList"
import { ComndsListCards } from "../../../components/ComndsListCards"


// simulação de banco
const commandItens = [
  {
      id:"1",
        title:"Cliente 01",
        description:"itens pedidos",
        statusPayment:["pagameto pendente"],
        price:10.00,
  },
  {
      id:"2",
        title:"Cliente 02",
        description:"itens pedidos",
        statusPayment:["Pagameto realizado"],
        price:20.00,
  },
  {
      id:"3",
        title:"Cliente 03",
        description:"itens pedidos",
        statusPayment:["Para retirada"],
        price:20.00,
  },
  {
      id:"4",
        title:"Cliente 04",
        description:"itens pedidos",
        statusPayment:["pagameto pendente"],
        price:20.00,
  },
]

export default function CommandPainel(){
  // CommandePanel
  return (
    <div className="flex-col px-4 py-8 items-center-center">
      <h1 className="text-3xl text-center font-bold">
          Painel de pedidos
        </h1>
        
      <div className="grid grid-cols-1 md:grid-cols-3">
      {commandItens.map((item) => (
        <ComndsListCards 
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          statusPayment={item.statusPayment}
          price={item.price}
      />
      ))
    }    
      </div>
      <div className="bg-orange-500">A</div>
      <div className="bg-blue-500">B</div>
      <div className="bg-green-500">C</div>
    </div>
    
  )
}