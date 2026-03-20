// ao cadastrar informar quantos produtos tem disponível para a venda
import BotaoDeAcao from "@/app/components/BotaoDeAcao";


export default function CardapioPage() {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Cardápio</h1>
          <h3 className="text-xl font-light">Gerenciar itens do cardápio</h3>
        </div>
        <BotaoDeAcao textoBotao="Adicionar item ao cardápio" linkBotao="/admin/cardapio/new" />
      </div>
    </div>
  );

}