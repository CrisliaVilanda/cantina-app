import EntradaForm from "@/app/components/EntradaForm";

export default function NewEntradaPage () {
  return (
    <div className="container mx-auto px-4 py-8 w-full">
      <h1 className="text-3xl font-semibold mb-6">
        Adicionar entrada no sistema
      </h1>
      <h3 className="text-xl font-light">Adicionar entradas de alimentos no sistema</h3>
      <div className="mt-10 border rounded-2xl p-5">
        <EntradaForm />
      </div>
    </div>
  )
}