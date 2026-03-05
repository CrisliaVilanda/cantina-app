import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function EntradasPage() {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">
            Estoque de alimentos alteração
          </h1>
          <h3 className="text-xl font-light">Entradas</h3>
        </div>
        <Button asChild>
          <Link href="/admin/entradas/new">
            <PlusCircle className="mr-2 h-5 w-5" /> Adicionar entrada
          </Link>
        </Button>
      </div>
      <div>
        <h3>Tabela</h3>
      </div>
    </div>
  );
}
