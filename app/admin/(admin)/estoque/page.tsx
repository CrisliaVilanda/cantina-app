import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function EstoquePage() {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Estoque de alimentos</h1>
          <h3 className="text-xl font-light">Controle de estoque</h3>
        </div>
        <Button asChild>
          <Link href="/admin/estoque/new">
            <PlusCircle className="mr-2 h-5 w-5" /> Adicionar ao estoque
          </Link>
        </Button>
      </div>
      <div>
        <h3>Tabela</h3>
        <p>Produto | unidade de medida | quantidade adiquirida | Data da aquisição | Quantidade de saídas | Quantidade restante</p>
        <p>filtros laterais</p>
      </div>
    </div>
  );
}
