import EntradaForm from "@/app/components/EntradaForm";

export default function NewEntradaPage () {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">
        Adicionar entrada no sistema
      </h1>
      <div>
        <EntradaForm />
      </div>
    </div>
  )
}