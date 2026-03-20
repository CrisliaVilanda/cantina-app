// ao cadastrar informar quantos produtos tem disponível para a venda
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { PlusCircle } from "lucide-react";

export default function CardapioPage() {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Cardápio</h1>
          <h3 className="text-xl font-light">Gerenciar itens do cardápio</h3>
        </div>
        <Button asChild>
          <Link href="/admin/cardapio/new">
            <PlusCircle className="mr-2 h-5 w-5" />
            Adicionar
          </Link>
        </Button>
      </div>

    </div>
  );

}